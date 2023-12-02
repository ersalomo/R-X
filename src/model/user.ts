export type User = {
  name: string;
  email: string;
  password: string;
};
export type UserResponse = Omit<User, "password"> & {
  id: string;
  avatar: string;
};
export type RegisterUser = User;
export type UserLogin = Omit<User, "name">;
export type Owner = Omit<UserResponse, "email">;
