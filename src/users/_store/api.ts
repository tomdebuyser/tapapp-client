import { IUser, IUserForm } from '../_models';
import { HttpClient, HttpPagedResponse, HttpMetadataQuery } from '../../_http';
import { getQueryParams } from '../../_utils/queryHelpers';
import { removeEmptyKeys } from '../../_utils/objectHelpers';

export function getUsers(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IUser>> {
  return HttpClient.get<HttpPagedResponse<IUser>>(`users${getQueryParams(query)}`);
}

export function getUserDetail(userId: string): Promise<IUser> {
  return HttpClient.get<IUser>(`users/${userId}`);
}

export function createUser(body: IUserForm): Promise<void> {
  return HttpClient.post('users', body);
}

export function updateUser(userId: string, body: IUserForm): Promise<void> {
  return HttpClient.put(`users/${userId}`, removeEmptyKeys(body));
}

export function deactivateUser(userId: string): Promise<void> {
  return HttpClient.post(`users/${userId}/deactivate`);
}

export function resendRegisterEmail(userId: string): Promise<void> {
  return HttpClient.post(`users/${userId}/resend-register-mail`);
}
