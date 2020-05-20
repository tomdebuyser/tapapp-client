import { IPermissions } from './Role';

export type IRoleForm = {
  name: string;
  permissions: IPermissions;
};
