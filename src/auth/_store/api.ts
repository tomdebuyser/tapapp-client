import { IResetPasswordForm } from '../_models/ResetPassword';
import { HttpClient } from '../../_http';
import { ILoginForm } from '../_models/Login';

export function resetPassword(body: IResetPasswordForm): Promise<void> {
  return HttpClient.post('auth/reset-password', body);
}

export function login(body: ILoginForm): Promise<void> {
  localStorage.setItem('LOGGED_IN', 'true'); // temporary functionality (to be removed once backend is ok)
  return HttpClient.post('auth/login', body);
}
