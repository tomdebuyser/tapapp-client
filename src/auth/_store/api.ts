import { IResetPasswordForm } from '../_models/ResetPassword';
import { HttpClient } from '../../_http';
import { ILoginForm } from '../_models/Login';
import { IUser } from '../../users/_models/User';

export function resetPassword(body: IResetPasswordForm): Promise<void> {
  return HttpClient.post('auth/reset-password', body);
}

export function login(body: ILoginForm): Promise<IUser> {
  localStorage.setItem('LOGGED_IN', 'true'); // temporary functionality (to be removed once backend is ok)
  return HttpClient.post<IUser>('auth/login', body);
}
