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
          ],
          where: {
            [Op.and]: [
              ...applyUserFilters(filters),
              ...applyAddressFilters(filters),
              applyAgeFilter(filters),
              applyCreatedAtFilter(filters),
            ],
          },
        });
    
        return userQuery;
      } catch (error) {
        throw new Error(`Error in getUsers: ${error.message}`);
    
      }
    };

    
export const updateUserDetails = async (input): Promise<boolean> => {
      try {
        const { first_name, last_name, mobile, birth_date } = input;
        const user = await db.users.update(
           input ,
          { where: { id: input.id } }
        );
        return true;
      } catch (error: any) {
        if (error.code) {
          throw { code: error.code, message: error.message };
        } else {
          throw { code: 500, message: "Internal Server Error" };
        }
      }
    };
