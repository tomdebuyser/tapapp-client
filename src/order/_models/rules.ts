import { Config } from '../../config';

export function hasReachedPayconiqLimit(amount: number): boolean {
  return Config.payconiqLimit < amount / 100;
}
