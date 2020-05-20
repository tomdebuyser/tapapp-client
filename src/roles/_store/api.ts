import { IRole, IRoleForm } from '../_models';
import { HttpClient, HttpPagedResponse, HttpMetadataQuery } from '../../_http';
import { getQueryParams } from '../../_utils/queryHelpers';
import { removeEmptyKeys } from '../../_utils/objectHelpers';

export function getRoleDetail(roleId: string): Promise<IRole> {
  return HttpClient.get<IRole>(`roles/${roleId}`);
}

export function getRoles(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IRole>> {
  return HttpClient.get<HttpPagedResponse<IRole>>(`roles${getQueryParams(query)}`);
}

export function createRole(body: IRoleForm): Promise<void> {
  return HttpClient.post('roles', removeEmptyKeys(body));
}

export function updateRole(roleId: string, body: IRoleForm): Promise<void> {
  return HttpClient.put(`roles/${roleId}`, removeEmptyKeys(body));
}

export function deleteRole(roleId: string): Promise<void> {
  return HttpClient.delete(`roles/${roleId}`);
}
