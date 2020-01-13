export interface IUser {
  createdAt: string;
  email: string;
  firstName?: string;
  id: string;
  lastName?: string;
  roles: {
    id: string;
    name: string;
  }[];
  state: UserState;
  updatedAt: string;
}

export interface IUserForm {
  email: string;
  firstName?: string;
  lastName?: string;
  roleIds: string[];
}

export enum UserState {
  ACTIVE = 'ACTIVE',
  REGISTERING = 'REGISTERING',
}
