import { IUser } from '../_models/User';
import { HttpClient } from '../../_http';
import { HttpPagedResponse } from '../../_http/HttpMetadata';

export function getUsers(): Promise<HttpPagedResponse<IUser>> {
  return HttpClient.get<HttpPagedResponse<IUser>>('users');
}

export function createUser(email: string, firstName: string, lastName: string): Promise<void> {
  return HttpClient.post('users', { email, firstName, lastName });
}
