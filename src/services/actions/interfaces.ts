import {
  GET_INGREDIENTS,
  SET_LOADING,
  SET_ERROR_MESSAGE,
  ADD_INGREDIENT_TO_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
  SORT_INGREDIENT_IN_ORDER,
  SET_ORDER_DETAILS,
  CLEAR_ORDER_INFO,
  CLEAR_INGREDIENTS_IN_ORDER,
  SET_USER,
  SET_TOKEN,
} from '../constants';
import { TIngredientType, TOrderDetails, TUserType } from '../types';

export interface IAddIngredients {
  readonly type: typeof GET_INGREDIENTS;
  readonly payload: Array<TIngredientType>;
}

export interface ISetLoading {
  readonly type: typeof SET_LOADING;
  readonly payload: boolean;
}

export interface ISetErrorMessage {
  readonly type: typeof SET_ERROR_MESSAGE;
  readonly payload: string;
}

export interface IAddIngredientToOrder {
  readonly type: typeof ADD_INGREDIENT_TO_ORDER;
  readonly payload: TIngredientType;
}

export interface IDeleteIngredientFromOrder {
  readonly type: typeof DELETE_INGREDIENT_FROM_ORDER;
  readonly payload: string;
}

export interface ISortIngredientInOrder {
  readonly type: typeof SORT_INGREDIENT_IN_ORDER;
  readonly payload: Array<TIngredientType>;
}

export interface IOrderDetails {
  readonly type: typeof SET_ORDER_DETAILS | typeof CLEAR_ORDER_INFO;
  readonly payload?: TOrderDetails;
}

export interface IIngredients {
  readonly type: typeof GET_INGREDIENTS;
  readonly payload: Array<TIngredientType>;
}

export interface IClearIngredientsInOrder {
  readonly type: typeof CLEAR_INGREDIENTS_IN_ORDER;
}

export interface ISetUserData {
  readonly type: typeof SET_USER;
  readonly payload: TUserType;
}

export interface ISetToken {
  readonly type: typeof SET_TOKEN;
  readonly payload: string;
}

export type TIngredientsActions =
  | IAddIngredients
  | ISetLoading
  | ISetErrorMessage
  | IAddIngredientToOrder
  | IDeleteIngredientFromOrder
  | ISortIngredientInOrder
  | IOrderDetails
  | IIngredients
  | ISetUserData
  | ISetToken;
