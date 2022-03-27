import { Action, ActionCreator } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { TIngredientsActions } from '../actions';
import { store } from '../reducers';

export type TIngredientType = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  customId?: string;
}

export type TOrderDetails = {
  success: boolean;
  name: string;
  order: {
    number: number;
  };
}

export type TInitialSelectedIngredientsState = {
  ingredients: Array<TIngredientType>;
  bun: TIngredientType;
}

export type TApiConstructorType = {
  baseUrl: string;
  ingredientsEndPoint: string;
  ordersEndPoint: string;
  resetPasswordEndPoint: string;
  setNewPasswordEndPoint: string;
  registerUserEndPoint: string;
  loginEndPoint: string;
  resetRefreshTokenEndPoint: string;
  logoutEndPoint: string;
  userEndPoint: string;
}

export type TUserType = {
  user: {
    email: string;
    name: string;
  };
}

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TIngredientsActions>
>;
