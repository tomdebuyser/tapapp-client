import { UserState } from '../_models/User';
import { translations } from '../../_translations';

export function labelForUserState(state: UserState): string {
  return translations.getLabel(`USERS.STATE.OPTIONS.${state}`);
}
