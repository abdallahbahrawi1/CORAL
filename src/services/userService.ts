// userService.ts

import {
  User,
  Session,
  ErrorResponse,
  CreateUserInput,	
  LoginUserInput,
  ChangePasswordInput,
  UpdateUserDetailsInput
} from '../Interfaces/userInterface';
import db from '../Database/Models/index';
import bcrypt from 'bcrypt';

// Function to generate a random string, if not already implemented
import { generateRandomString } from '../Utils/utils';

export const createUser = async (input: CreateUserInput): Promise<Session | ErrorResponse> => {
  const { username, email, password, first_name, last_name, mobile, birth_date } = input;

  try {
    const existingEmail = await db.users.findOne({ where: { email } });
    if (existingEmail) {
      throw { code: 409, message: 'Email already in Use' };
    }

    const existingUsername = await db.users.findOne({ where: { username } });
    if (existingUsername) {
      throw { code: 409, message: 'Username already in Use' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = (await db.users.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      mobile,
      birth_date
    })) as User;

    const session_key = generateRandomString(30);
    const newSession = (await db.sessions.create({
      user_id: newUser.id,
      session_key
    })) as Session;

    return newSession;
  } catch (error) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const loginUser = async (input: LoginUserInput): Promise<Session | ErrorResponse> => {
  const { email, password } = input;

  try {
    const user: User = await db.users.findOne({ where: { email } });

    if (!user) {
      throw {
        code: 404,
        message: "User with this Email/Username doesn't exist"
      };
    }

    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      throw { code: 400, message: 'Password is incorrect' };
    }

    const session_key = generateRandomString(20);
    const newSession = await db.sessions.create({
      user_id: user.id,
      session_key
    });

    return newSession;
  } catch (error) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const logoutUser = async (session: Session): Promise<boolean | ErrorResponse> => {
  try {
    await db.sessions.destroy({ where: { session_key: session.session_key } });
    return true;
  } catch (error) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const checkSessionId = async (sessionKey: string): Promise<Session | ErrorResponse> => {
  try {
    const session = await db.sessions.findOne({
      where: { session_key: sessionKey }
    });

    if (!session) {
      throw { code: 403, message: 'Invalid session ID.' };
    }

    return session;
  } catch (error) {
    if (error.code) {
      throw { code: error.code, message: error.message };
    } else {
      throw { code: 500, message: 'Internal Server Error' };
    }
  }
};

export const changePassword = async (input: ChangePasswordInput, session: Session): Promise<boolean | ErrorResponse> => {
  try {
    const { currentPassword, newPassword } = input;
    const user: User = await db.users.findOne({
      where: { id: session.user_id }
    });

    const matchPassword = await bcrypt.compare(currentPassword, user.password);
    if (!matchPassword) {
      throw { code: 401, message: 'Password is incorrect' };
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.users.update({ password: hashedPassword }, { where: { id: user.id } });

    await db.sessions.destroy({ where: { user_id: user.id } });

    return true;
  } catch (error) {
    if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }
  }
};

interface ChangeUsernameInput {
  newUsername: string;
}

export const changeUsername = async (input: ChangeUsernameInput, session: Session): Promise<boolean | ErrorResponse> => {
  try {
		const { newUsername } = input;
		const existingUsername = await db.users.findOne({ where: { newUsername } });
    if (existingUsername) {
      throw { code: 409, message: 'Username already in Use' };
    }
    await db.users.update({ username: newUsername }, { where: { id: session.user_id } });

    return true;
  } catch (error) {
    if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }  }
};

export const getUserDetails = async (session: Session): Promise<User | ErrorResponse> => {
  try {
    const user = await db.users.findOne({ where: { id: session.user_id } });
    return user;
  } catch (error) {
    if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }  }
};

export const updateUserDetails = async (input: UpdateUserDetailsInput, session: Session): Promise<boolean | ErrorResponse> => {
  try {
    const { first_name, last_name, mobile, birth_date } = input;
    const user = await db.users.update({ first_name, last_name, mobile, birth_date }, { where: { id: session.user_id } });
    return true;
  } catch (error) {
    if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }  }
};

export const deleteUserAccount = async (session: Session): Promise<boolean | ErrorResponse> => {
  try {
    const user = await db.users.destroy({ where: { id: session.user_id } });
    return true;
  } catch (error) {
    if (error.code) {
        throw { code: error.code, message: error.message };
      } else {
        throw { code: 500, message: 'Internal Server Error' };
      }  }
};
