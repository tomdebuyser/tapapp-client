import { UserState } from '../../users/_models';
import { IPermissions } from '../../roles/_models';

export type IProfile = {
  createdAt?: string;
  createdBy?: string;
  email: string;
  firstName?: string;
  id: string;
  lastName?: string;
  permissions: IPermissions;
  state: UserState;
  updatedAt?: string;
  updatedBy?: string;
};
