import { IUser } from '../_models/User';
import { HttpClient } from '../../_http';

export function getUsers(): Promise<IUser[]> {
  return HttpClient.get<IUser[]>('users');
}
