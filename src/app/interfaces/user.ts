export interface UserSignIn {
  id?: string;
  group?: string;
  active?: boolean;
  name?: string;
}

export interface User {
  id?: string;
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  cpf?: string;
  group?: string;
  active?: boolean;
  gender?: string;
}
export interface ListUser {
  users: Array<User>;
}