import { IRole, IRoleForm } from '../_models/Role';
import { HttpClient } from '../../_http';
import { HttpPagedResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';
import { getQueryParams } from '../../_utils/queryHelpers';

export function getRoles(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IRole>> {
  return HttpClient.get<HttpPagedResponse<IRole>>(`roles${getQueryParams(query)}`);
}

export function createRole(body: IRoleForm): Promise<IRole> {
  return HttpClient.post('roles', body);
}
