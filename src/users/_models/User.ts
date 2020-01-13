export interface IUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  state: UserState;
  firstName?: string;
  lastName?: string;
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
