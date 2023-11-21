export type User = {
  name: string;
  email: string;
  password: string;
};
export type UserResponse = Omit<User, "password"> & {
  id: string;
  avatar: string;
};
// export type UserResponse = {
//   id: string;
//   name: string;
//   email: string;
//   avatar: string;
// };
export type RegisterUser = User;
export type UserLogin = Omit<User, "name">;
