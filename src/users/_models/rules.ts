import { IUser, UserState } from './User';

export function canUserBeDeactiveated(user: IUser): boolean {
  return user.state === UserState.Active;
}

export function canResendRegisterEmailForUser(user: IUser): boolean {
  return [UserState.Inactive, UserState.Registering].includes(user.state);
}
