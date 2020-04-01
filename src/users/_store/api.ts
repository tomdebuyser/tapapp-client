import { IUser, IUserForm } from '../_models';
import { HttpClient, HttpPagedResponse, HttpMetadataQuery } from '../../_http';
import { getQueryParams } from '../../_utils/queryHelpers';

export function getUsers(query?: HttpMetadataQuery): Promise<HttpPagedResponse<IUser>> {
  return HttpClient.get<HttpPagedResponse<IUser>>(`users${getQueryParams(query)}`);
}

export function createUser(body: IUserForm): Promise<IUser> {
  return HttpClient.post<IUser>('users', body);
}

export function updateUser(userId: string, body: IUserForm): Promise<IUser> {
  return HttpClient.put<IUser>(`users/${userId}`, body);
}

export function deactivateUser(userId: string): Promise<IUser> {
  return HttpClient.post<IUser>(`users/${userId}/deactivate`);
}

export function resendRegisterEmail(userId: string): Promise<IUser> {
  return HttpClient.post<IUser>(`users/${userId}/resend-register-mail`);
}
