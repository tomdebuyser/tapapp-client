import { IUser, IUserForm } from '../_models/User';
import { HttpClient } from '../../_http';
import { HttpPagedResponse } from '../../_http/HttpMetadata';

export function getUsers(): Promise<HttpPagedResponse<IUser>> {
  return HttpClient.get<HttpPagedResponse<IUser>>('users');
}

export function createUser(body: IUserForm): Promise<void> {
  return HttpClient.post('users', body);
}
