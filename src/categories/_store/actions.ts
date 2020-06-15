import { Action } from 'redux';
import { ApiError } from '../../_http';
import { ICategory } from '../_models';

export enum CategoriesActionType {
  GetCategories = '[Categories] GetCategories',
  GetCategoriesError = '[Categories] GetCategoriesError',
  GetCategoriesSuccess = '[Categories] GetCategoriesSuccess',
}

export class GetCategories implements Action<CategoriesActionType> {
  readonly type = CategoriesActionType.GetCategories;
}

export class GetCategoriesSuccess implements Action<CategoriesActionType> {
  readonly type = CategoriesActionType.GetCategoriesSuccess;
  constructor(public payload: { categories: ICategory[] }) {}
}

export class GetCategoriesError implements Action<CategoriesActionType> {
  readonly type = CategoriesActionType.GetCategoriesError;
  constructor(public payload: { error?: ApiError }) {}
}

export type CategoriesAction = GetCategories | GetCategoriesSuccess | GetCategoriesError;
