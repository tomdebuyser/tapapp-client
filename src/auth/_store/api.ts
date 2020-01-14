import { IResetPasswordForm } from '../_models/ResetPassword';
import { HttpClient } from '../../_http';

export function resetPassword(body: IResetPasswordForm): Promise<void> {
  return HttpClient.post('auth/reset-password', body);
}
