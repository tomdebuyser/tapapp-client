import { IUser, IUserForm } from '../_models/User';
import { HttpClient } from '../../_http';
import { HttpPagedResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';

export function getUsers(queryParams: HttpMetadataQuery): Promise<HttpPagedResponse<IUser>> {
  let query = '';
  const setQuerySeparator = () => (query.length ? '&' : '?');
  if (queryParams?.take) query += `${setQuerySeparator()}take=${queryParams?.take}`;
  if (queryParams?.skip) query += `${setQuerySeparator()}skip=${queryParams?.skip}`;
  if (queryParams?.search) query += `${setQuerySeparator()}search=${queryParams?.search}`;
  if (queryParams?.sortBy) query += `${setQuerySeparator()}sortBy=${queryParams?.sortBy}`;
  if (queryParams?.sortDirection) query += `${setQuerySeparator()}sortDirection=${queryParams?.sortDirection}`;

  return HttpClient.get<HttpPagedResponse<IUser>>(`users${query}`);
}

export function createUser(body: IUserForm): Promise<void> {
  return HttpClient.post('users', body);
}
