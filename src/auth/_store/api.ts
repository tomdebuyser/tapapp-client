import { IChangePasswordForm, ILoginForm, IRequestPasswordResetForm, IChangePassword } from '../_models';
import { HttpClient } from '../../_http';
import { IProfile } from '../../profile/_models';

export function choosePassword(body: IChangePasswordForm, resetToken: string): Promise<void> {
  return HttpClient.post('auth/reset-password', { ...body, resetToken });
}

export function changePassword(body: IChangePassword): Promise<void> {
  const payload = {
    newPassword: body.newPassword,
    oldPassword: body.oldPassword,
  };

  return HttpClient.post('auth/change-password', payload);
}

export function login(body: ILoginForm): Promise<IProfile> {
  return HttpClient.post<IProfile>('auth/login', body);
}

export function logout(): Promise<void> {
  return HttpClient.post('auth/logout');
}

export function requestPasswordReset(body: IRequestPasswordResetForm): Promise<void> {
  return HttpClient.post('auth/request-password-reset', body);
}

export function authenticate(): Promise<IProfile> {
  return HttpClient.get<IProfile>('auth/me');
}
