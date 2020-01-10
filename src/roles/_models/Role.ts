export interface IRole {
  id: string;
  createdAt: string;
  updatedAt: string;
  name: string;
  permissions: IPermissions;
}

export interface IPermissions {
  roles: {
    view: boolean;
    edit: boolean;
  };
  users: {
    view: boolean;
    edit: boolean;
  };
}

export interface IRoleForm {
  name: string;
  // TODO: Implement
}
