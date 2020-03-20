export interface IRole {
  createdAt: string;
  createdBy: string;
  id: string;
  name: string;
  permissions: IPermissions;
  updatedAt: string;
  updatedBy: string;
}

export interface IPermissions {
  roles: {
    edit: boolean;
    view: boolean;
  };
  users: {
    edit: boolean;
    view: boolean;
  };
}

export interface IRoleForm {
  name: string;
  permissions: IPermissions;
}
