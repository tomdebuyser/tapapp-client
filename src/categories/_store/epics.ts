import { Epic } from 'redux-observable';
import { from, of } from 'rxjs';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { categoriesActions } from '../../_store/actions';
import { AuthActionType } from '../../auth/_store/actions';
import * as categoriesApi from './api';
import { CategoriesActionType } from './actions';

const authenticateSuccessEpic$: Epic = action$ =>
  action$.ofType(AuthActionType.AuthenticateSuccess).pipe(map(() => new categoriesActions.GetCategories()));

const getCategoriesEpic$: Epic = action$ =>
  action$.ofType(CategoriesActionType.GetCategories).pipe(
    exhaustMap(() =>
      from(categoriesApi.getCategories()).pipe(
        map(categories => new categoriesActions.GetCategoriesSuccess({ categories })),
        catchError(error => of(new categoriesActions.GetCategoriesError({ error }))),
      ),
    ),
  );

export default [authenticateSuccessEpic$, getCategoriesEpic$];
