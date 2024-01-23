export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  mobile: string;
  birth_date: string;
}

export interface Session {
  user_id: number;
  session_key: string;
}

export interface ErrorResponse<T = string> {
  code: number;
  message: T;
}

export interface CreateUserInput {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  mobile: string;
  birth_date: string;
}

export interface LoginUserInput {
  email: string;
  password: string;
}

export interface ChangePasswordInput {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateUserDetailsInput {
  first_name: string;
  last_name: string;
  mobile: string;
  birth_date: string;
}
