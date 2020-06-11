import { ILoginForm } from '../_models';
import { HttpClient } from '../../_http';
import { IProfile } from '../../profile/_models';

export function login(body: ILoginForm): Promise<IProfile> {
  return HttpClient.post<IProfile>('auth/login', body);
}

export function logout(): Promise<void> {
  return HttpClient.post('auth/logout');
}

export function authenticate(): Promise<IProfile> {
  return HttpClient.get<IProfile>('auth/me');
}
