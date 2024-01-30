import { Op, Sequelize } from 'sequelize';
import  db  from '../../Database/Models/index';

const calculateAge = (birthDate) => {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
    age--;
  }

  return age;
};

const applyUserFilters = (filters) => {
  const userFilters = [
    filters.id ? { id: filters.id } : {},
    filters.email ? { email: filters.email } : {},
    filters.username ? { username: filters.username } : {},
    filters.birth_date ? { birth_date: filters.birth_date } : {},
  ];

  return userFilters;
};

const applyAddressFilters = (filters) => {
  const addressFilters = [
    filters.country ? { '$addresses.country$': filters.country } : {},
    filters.city ? { '$addresses.city$': filters.city } : {},
    filters.postal_code ? { '$addresses.postal_code$': filters.postal_code } : {},
  ];

  return addressFilters;
};

const applyAgeFilter = (filters) => {
  if (filters.minAge && filters.maxAge) {
    return {
      birth_date: {
        [Op.between]: [
          new Date(new Date().setFullYear(new Date().getFullYear() - filters.maxAge - 1)),
          new Date(new Date().setFullYear(new Date().getFullYear() - filters.minAge)),
        ],
      },
    };
  }

  return {};
};

const applyCreatedAtFilter = (filters) => {
  if (filters.createdStartDate && filters.createdEndDate) {
    return {
      createdAt: {
        [Op.between]: [new Date(filters.createdStartDate), new Date(filters.createdEndDate)],
      },
    };
  }

  return {};
};

// const applyLoginSessionFilter = (filters) => {
//   if (filters.loginStartDate && filters.loginEndDate) {
//     return {
//       model: db.sessions,
//       attributes: [],
//       where: {
//         session_key: { [Op.not]: null },
//         expiry_date: {
//           [Op.between]: [new Date(filters.loginStartDate), new Date(filters.loginEndDate)],
//         },
//       },
//     };
//   }

//   return {};
// };
const applyLoginSessionFilter = (filters) => {
  if (filters.loginStartDate && filters.loginEndDate) {
    return {
      model: db.sessions,
      attributes: [
        [Sequelize.literal("DATE(created_at)"), "loginDay"],
        [Sequelize.literal("COUNT(DISTINCT user_id)"), "visitorCount"]
      ],
      where: {
        session_key: { [Op.not]: null },
        created_at: {
          [Op.between]: [new Date(filters.loginStartDate), new Date(filters.loginEndDate)],
        },
      },
      group: [Sequelize.literal("DATE(created_at)")],
    };
  }

  return {};
};
export const getUsers = async (filters: any) => {
      try {
        console.log('Created At Filter:', applyCreatedAtFilter(filters));
        const userQuery = await db.users.findAll({
          include: [
            {
              model: db.addresses,
              attributes: ['city', 'country', 'postal_code'],
            },
            // applyLoginSessionFilter(filters),
          ],
          where: {
            [Op.and]: [
              ...applyUserFilters(filters),
              ...applyAddressFilters(filters),
              applyAgeFilter(filters),
              applyCreatedAtFilter(filters),
              // Add more conditions based on other filters
            ],
          },
        });
    
        return userQuery;
      } catch (error) {
        throw new Error(`Error in getUsers: ${error.message}`);
    
      }
    };
    interface FilterOptions {
      id: number;
      startDate: Date;
      endDate: Date;
    }
    
   
// interface UserQueryOptions {
//   sortBy?: string;
//   attributes?: string[];
//   include?: any[];
//   where?: any;
//   searchInput?: string;
// }

// const commonUserAttributes = [
//   'id',
//   'email',
//   'first_name',
//   'last_name',
//   'username',
//   'birth_date',
//   'createdAt',
// ];

// const commonAddressAttributes = [
//   'id',
//   'city',
//   'street',
//   'country',
//   'postal_code',
//   'address_line1',
// ];

// const commonInclude = [
//   {
//     model: db.addresses,
//     attributes: commonAddressAttributes,
//   },
// ];

// const commonSortOptions: Record<string, any> = {
//   'id': [['id', 'ASC']],
//   'birth-date': [['birth_date', 'ASC']],
//   'latest': [['createdAt', 'DESC']],
// };

// export const getUsers = async (options: UserQueryOptions) => {
//   try {
//     const sortBy = options.sortBy || 'latest';
//     const sortOrder = commonSortOptions[sortBy] || commonSortOptions['latest'];
//     const whereConditions: any = {};

//     if (options.searchInput) {
//       whereConditions[Op.or] = [
//         {
//           email: {
//             [Op.like]: `%${options.searchInput}%`,
//           },
//         },
//         {
//           username: {
//             [Op.like]: `%${options.searchInput}%`,
//           },
//         },
//         // Add more conditions as needed
//       ];
//     }

//     const mergedWhereConditions = { ...options, ...whereConditions };

//     const result = await db.users.findAll({
//       subQuery: false,
//       where: mergedWhereConditions,
//       attributes: [...commonUserAttributes, ...(options.attributes || [])],
//       include: [...commonInclude, ...(options.include || [])],
//       order: sortOrder,
//     });

//     return {
//       totalUsers: result.length as number,
//       data: result,
//     };
//   } catch (error) {
//     console.error(error);
//     throw new Error('Internal Server Error');
//   }
// };



// import db from '../../Database/Models/index'
// export const getUsers = async (options: any) => {
//     try {
//       const queryOptions = {
//         attributes: ['id', 'email', 'first_name', 'last_name', 'username', 'birth_date'],
//         include: [
//           {
//             model: db.addresses,
//             attributes: ['id', 'city', 'street', 'country', 'postal_code', 'address_line1'],
//           },
//         ],
//         where: options,  // Use 'where' instead of spreading '...options'
//       };
  
//       const users = Object.keys(options).length > 0
//         ? await db.users.findAll(queryOptions)
//         : await db.users.findAll();
  
//       return users;
//     } catch (error) {
//       throw new Error(`Error in getUsers: ${error.message}`);
//     }
//   };
// // export const getUsers = async (options: any) => {
// //     try {
// //       const users = await db.users.findAll({
// //         attributes: ['id', 'email', 'first_name', 'last_name', 'username', 'birth_date'],
// //         include: [
// //           {
// //             model: db.addresses,
// //             attributes: ['id', 'city', 'street', 'country', 'postal_code', 'address_line1'],
// //           },
// //         ],
// //         ...options,
// //       });
  
// //       return users;
// //     } catch (error) {
// //       throw new Error(`Error in getUsers: ${error.message}`);
// //     }
// //   };
// // export const getUsers = async (options: any) => {
// //     try {
// //       const queryOptions = {
// //         attributes: ['id', 'email', 'first_name', 'last_name', 'username', 'birth_date'],
// //         include: [
// //           {
// //             model: db.addresses,
// //             attributes: ['id', 'city', 'street', 'country', 'postal_code', 'address_line1'],
// //           },
// //         ],
// //         ...options,
// //       };
  
// //       const users = options ? await db.users.findAll(queryOptions) : await db.users.findAll();
  
// //       return users;
// //     } catch (error) {
// //       throw new Error(`Error in getUsers: ${error.message}`);
// //     }
// //   };
// // export  const getAllUsers = async (
// //   ): Promise<boolean | ErrorResponse> => {
// //     try {
// //       const users = await db.users.findAll();
// //       return true;
// //     } catch (error: any) {
// //       if (error.code) {
// //         throw { code: error.code, message: error.message };
// //       } else {
// //         throw { code: 500, message: "Internal Server Error" };
// //       }
// //     }}


// // export const deleteUserAccount = async (
// //     session: Session
// //   ): Promise<boolean | ErrorResponse> => {
// //     try {
// //       const user = await db.users.destroy({ where: { id: session.user_id } });
// //       return true;
// //     } catch (error: any) {
// //       if (error.code) {
// //         throw { code: error.code, message: error.message };
// //       } else {
// //         throw { code: 500, message: "Internal Server Error" };
// //       }
// //     }}

// // export const getUserDetails = async (
// //   session: Session
// // ): Promise<User | ErrorResponse> => {
// //   try {
// //     const user = await db.users.findOne({ where: { id: session.user_id } });
// //     return user;
// //   } catch (error: any) {
// //     if (error.code) {
// //       throw { code: error.code, message: error.message };
// //     } else {
// //       throw { code: 500, message: "Internal Server Error" };
// //     }
// //   }
// // };
