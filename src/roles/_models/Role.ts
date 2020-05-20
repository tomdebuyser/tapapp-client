export type IRole = {
  createdAt: string;
  createdBy: string;
  id: string;
  name: string;
  permissions: IPermissions;
  updatedAt: string;
  updatedBy: string;
};

export type IPermissions = {
  roles: {
    edit: boolean;
    view: boolean;
  };
  users: {
    edit: boolean;
    view: boolean;
  };
};
