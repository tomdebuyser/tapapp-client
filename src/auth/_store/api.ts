import { IChangePasswordForm, ILoginForm, IRequestPasswordResetForm } from '../_models';
import { HttpClient } from '../../_http';
import { IUser } from '../../users/_models';

export function choosePassword(body: IChangePasswordForm, token: string): Promise<void> {
  return HttpClient.post('auth/reset-password', { ...body, token });
}

export function login(body: ILoginForm): Promise<IUser> {
  return HttpClient.post<IUser>('auth/login', body);
}

export function logout(): Promise<void> {
  return HttpClient.post('auth/logout');
}

export function requestPasswordReset(body: IRequestPasswordResetForm): Promise<void> {
  return HttpClient.post('auth/request-password-reset', body);
}

export function authenticate(): Promise<IUser> {
  return HttpClient.get('auth/authenticate');
}
