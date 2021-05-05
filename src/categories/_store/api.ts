import { HttpClient } from '../../_http';
import { ICategory } from '../_models';

export function getCategories(): Promise<ICategory[]> {
  return HttpClient.get<ICategory[]>('categories');
}
