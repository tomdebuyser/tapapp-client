export interface IUser {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  state: UserState;
}

export enum UserState {
  ACTIVE = 'ACTIVE',
  REGISTERING = 'REGISTERING',
}
