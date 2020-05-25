export type IUser = {
  createdAt?: string;
  createdBy?: string;
  email: string;
  firstName?: string;
  id: string;
  lastName?: string;
  roles: {
    id: string;
    name: string;
  }[];
  state: UserState;
  updatedAt?: string;
  updatedBy?: string;
};

export enum UserState {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Registering = 'REGISTERING',
}
