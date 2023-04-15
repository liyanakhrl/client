/* eslint-disable prettier/prettier */
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}
