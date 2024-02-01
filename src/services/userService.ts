
import {
  User,
  Session,
  ErrorResponse,
  CreateUserInput,
  LoginUserInput,
  ChangePasswordInput,
  UpdateUserDetailsInput,
} from "../Interfaces/userInterface";
import db from "../Database/Models/index";
import bcrypt from "bcrypt";
import { generateRandomString ,minutesToMilliseconds} from "../Utils/utils";

export const createUser = async (
  input: CreateUserInput
): Promise<Session | ErrorResponse> => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    mobile,
    birth_date,
  } = input;

  try {
    const existingEmail = await db.users.findOne({ where: { email } });
    if (existingEmail) {
      throw { code: 409, message: "Email already in Use" };
    }

    const existingUsername = await db.users.findOne({ where: { username } });
    if (existingUsername) {
      throw { code: 409, message: "Username already in Use" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = (await db.users.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      mobile,
      birth_date,
    })) as User;

    const session_key = generateRandomString(30);
    const newSession = (await db.sessions.create({
      user_id: newUser.id,
      session_key,
    })) as Session;

    return newSession;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const loginUser = async (
  input: LoginUserInput
): Promise<Session | ErrorResponse> => {
  const { email, password } = input;

  try {
    const user: User = await db.users.findOne({ where: { email } });

    if (!user) {
      throw {
        code: 404,
        message: "User with this Email/Username doesn't exist",
      };
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw { code: 401, message: "Password is incorrect" };
    }

    const session_key = generateRandomString(20);
    const newSession = await db.sessions.create({
      user_id: user.id,
      session_key,
    });

    return newSession;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const logoutUser = async (
  session: Session
): Promise<boolean | ErrorResponse> => {
  try {
    await db.sessions.destroy({ where: { session_key: session.session_key } });
    return true;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const checkSessionKey = async (
  sessionKey: string
): Promise<Session | ErrorResponse> => {
  try {
    const session = await db.sessions.findOne({
      where: { session_key: sessionKey },
    });

    // if (!session || session.expiry_date < new Date()) {
    //   throw { code: 403, message: "Invalid session Key." };
    // }
    
    if (!session) {
      throw { code: 403, message: "Invalid session Key." };
    }
    
    return session;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const changePassword = async (
  input: ChangePasswordInput,
  session: Session
): Promise<boolean | ErrorResponse> => {
  try {
    const { currentPassword, newPassword } = input;
    const user: User = await db.users.findOne({
      where: { id: session.user_id },
    });

    const matchPassword = await bcrypt.compare(currentPassword, user.password);
    if (!matchPassword) {
      throw { code: 401, message: "Password is incorrect" };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.users.update(
      { password: hashedPassword },
      { where: { id: user.id } }
    );

    await db.sessions.destroy({ where: { user_id: user.id } });

    return true;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

interface ChangeUsernameInput {
  newUsername: string;
}

export const changeUsername = async (
  input: ChangeUsernameInput,
  session: Session
): Promise<boolean | ErrorResponse> => {
  try {
    const { newUsername } = input;
    const existingUsername = await db.users.findOne({ where: { username:newUsername } });
    if (existingUsername) {
      throw { code: 409, message: "Username already in Use" };
    }
    await db.users.update(
      { username: newUsername },
      { where: { id: session.user_id } }
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

export const getUserDetails = async (
  session: Session
): Promise<User | ErrorResponse> => {
  try {
    const user = await db.users.findOne({ where: { id: session.user_id } });
    return user;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const updateUserDetails = async (
  input: UpdateUserDetailsInput,
  session: Session
): Promise<boolean | ErrorResponse> => {
  try {
    const { first_name, last_name, mobile, birth_date } = input;
    const user = await db.users.update(
      { first_name, last_name, mobile, birth_date },
      { where: { id: session.user_id } }
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

export const deleteUserAccount = async (
  session: Session
): Promise<boolean | ErrorResponse> => {
  try {
    const user = await db.users.destroy({ where: { id: session.user_id } });
    return true;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

// export const uploadProfileImage = async (session: Session,file): Promise<boolean | ErrorResponse> => {
//   try {
//     const updateImage = await db.users.update({ profile_image:`Uploads/${file.filename}`}, { where: { id: session.user_id } });
//     return true;
//   } catch (error: any) {
//     if (error.code) {
//       throw { code: error.code, message: error.message };
//     } else {
//       throw { code: 500, message: "Internal Server Error" };
//     }
//   }
// };

export const uploadProfileImage = async (session: Session,file) => {
  try {
    const updateImage = await db.users.update({ profile_image:`Uploads/${file.filename}`}, { where: { id: session.user_id } });
    return `Uploads/${file.filename}`;
  } catch (error: any) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: "Internal Server Error" };
    }
  }
};

export const deleteExpiredSessions=async (): Promise<void>=>{
  try {
    // Find sessions that have already expired
    const expiredSessions = await db.sessions.findAll({
      where: {
        expiry_date: { [db.Sequelize.Op.lt]: new Date() },
      },
    });

    // Delete the expired sessions
    await db.sessions.destroy({
      where: {
        expiry_date: { [db.Sequelize.Op.lt]: new Date() },
      },
    });

    console.log(`${expiredSessions.length} expired sessions deleted.`);
  } catch (error) {
    throw new Error('Failed to delete expired sessions');
  }
}


export const extendSessionExpiry = async (sessionKey: string): Promise<void> => {
  try {
    const newExpiryDate = new Date(Date.now() + minutesToMilliseconds(60));
    // Find the session in the database and update its expiry date
    await db.sessions.update(
      { expiry_date: newExpiryDate },
      { where: { session_key: sessionKey } }
    );
  } catch (error: any) {
    // Handle any errors during the update
    throw { code: 500, message: "Internal Server Error" };
  }
};

