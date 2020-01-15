import { IChangePasswordForm } from '../_models/ChoosePassword';
import { HttpClient } from '../../_http';
import { ILoginForm } from '../_models/Login';
import { IUser } from '../../users/_models/User';
import { IRequestPasswordResetForm } from '../_models/RequestPasswordReset';

export function choosePassword(body: IChangePasswordForm): Promise<void> {
  return HttpClient.post('auth/reset-password', body);
}

export function login(body: ILoginForm): Promise<IUser> {
  localStorage.setItem('LOGGED_IN', 'true'); // temporary functionality (to be removed once backend is ok)
  return HttpClient.post<IUser>('auth/login', body);
}

export function logout(): Promise<void> {
  localStorage.removeItem('LOGGED_IN'); // temporary functionality (to be removed once backend is ok)
  return HttpClient.post('auth/logout');
}

export function requestPasswordReset(body: IRequestPasswordResetForm): Promise<void> {
  return HttpClient.post('auth/reset-password-request', body);
}
