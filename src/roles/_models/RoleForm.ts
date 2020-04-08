import { IPermissions } from './Role';

export interface IRoleForm {
  name: string;
  permissions: IPermissions;
}
