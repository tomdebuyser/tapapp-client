import { IUser, IUserForm } from '../_models/User';
import { HttpClient } from '../../_http';
import { HttpPagedResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';
import { getQueryParams } from '../../_utils/queryHelpers';

export function getUsers(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IUser>> {
  return HttpClient.get<HttpPagedResponse<IUser>>(`users${getQueryParams(query)}`);
}

export function createUser(body: IUserForm): Promise<void> {
  return HttpClient.post('users', body);
}

export function inactivateUser(user: IUser): Promise<void> {
  return HttpClient.post(`users/${user.id}/inactivate`);
}
