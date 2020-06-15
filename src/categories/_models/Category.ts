import { IProduct } from './Product';

export type ICategory = {
  id: string;
  name: string;
  products: IProduct[];
};
