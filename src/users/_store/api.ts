import { IUser, IUserForm } from '../_models/User';
import { HttpClient } from '../../_http';
import { HttpPagedResponse, HttpMetadataQuery } from '../../_http/HttpMetadata';
import { getQueryParams } from '../../_utils/queryHelpers';
import { removeEmptyKeys } from '../../_utils/objectHelpers';

export function getUsers(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IUser>> {
  return HttpClient.get<HttpPagedResponse<IUser>>(`users${getQueryParams(query)}`);
}

export function createUser(body: IUserForm): Promise<IUser> {
  return HttpClient.post<IUser>('users', body);
}

export function updateUser(userId: string, body: IUserForm): Promise<IUser> {
  return HttpClient.patch<IUser>(`users/${userId}`, removeEmptyKeys(body));
}

export function inactivateUser(userId: string): Promise<IUser> {
  return HttpClient.post<IUser>(`users/${userId}/inactivate`);
}

export function resendRegisterEmail(userId: string): Promise<IUser> {
  return HttpClient.post<IUser>(`users/${userId}/resend-register-mail`);
}
