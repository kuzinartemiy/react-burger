import Api from '../../utils/api';
import { nanoid } from 'nanoid';
import { AppThunk, AppDispatch, TIngredientType, TOrderDetails } from '../types';

import {
  SET_LOADING_OFF,
  SET_LOADING_ON,
  GET_INGREDIENTS,
  SET_INGREDIENT_DETAILS,
  CLEAR_INGREDIENT_DETAILS,
  ADD_INGREDIENT_TO_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
  SORT_INGREDIENT_IN_ORDER,
  CLEAR_INGREDIENTS_IN_ORDER,
  CLEAR_ORDER_INFO,
  SET_ERROR_MESSAGE,
  SET_ORDER_DETAILS
} from '../constants';

export interface IAddIngredients {
  readonly type: typeof GET_INGREDIENTS;
  readonly payload: Array<TIngredientType>;
}

export interface ISetLoading {
  readonly type: typeof SET_LOADING_ON | typeof SET_LOADING_OFF;
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

export interface ISetIngredientDetails {
  readonly type: typeof SET_INGREDIENT_DETAILS;
  readonly payload: TIngredientType;
}

export interface IOrderDetails {
  readonly type: typeof SET_ORDER_DETAILS | typeof CLEAR_ORDER_INFO;
  readonly payload: TOrderDetails;
}

export interface IIngredients {
  readonly type: typeof GET_INGREDIENTS;
  readonly payload: Array<TIngredientType>;
}

export type TIngredientsActions = 
  | IAddIngredients
  | ISetLoading
  | ISetErrorMessage
  | IAddIngredientToOrder
  | IDeleteIngredientFromOrder
  | ISortIngredientInOrder
  | ISetIngredientDetails
  | IOrderDetails
  | IIngredients;

export const addIngredientToOrder = (ingredient: TIngredientType): IAddIngredientToOrder => {
  ingredient.customId = nanoid(10);
  return {
    type: ADD_INGREDIENT_TO_ORDER,
    payload: ingredient,
  }
};

export const deleteIngredientFromOrder = (customId: string): IDeleteIngredientFromOrder => {
  return {
    type: DELETE_INGREDIENT_FROM_ORDER,
    payload: customId,
  }
};

export const sortIngredientInOrder = (sortedIngredients: Array<TIngredientType>): ISortIngredientInOrder => {
  return {
    type: SORT_INGREDIENT_IN_ORDER,
    payload: sortedIngredients,
  }
};

export const setIngredientDetails = (ingredientDetails: TIngredientType): ISetIngredientDetails => {
  return {
    type: SET_INGREDIENT_DETAILS,
    payload: ingredientDetails
  }
};

const addIngredients = (ingredients: Array<TIngredientType>): IAddIngredients => {
  return {
    type: GET_INGREDIENTS,
    payload: ingredients
  };
};

const setLoading = (flag: boolean): ISetLoading => {
  return flag ? { type: SET_LOADING_ON } : { type: SET_LOADING_OFF };
};


const setErrorMessage = (errorMessage: string): ISetErrorMessage => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
  };
};

export const getIngredients: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    Api.getIngredients()
      .then(res => {
        if(res.success) {
          dispatch(addIngredients(res.data));
          dispatch(setLoading(false));
        } else {
          throw Error(res);
        }
      })
      .catch(error => {
        console.log(`GET_INGREDIENTS_ERROR: ${error}`);
        dispatch(setErrorMessage('Ошибка при получении ингредиентов.'));
        setTimeout(() => {
          dispatch(setErrorMessage(''));
        }, 3000);
      })
  };
};

export const sendOrder: AppThunk = (ingredients: Array<TIngredientType>) => {
  return (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    Api.sendOrder(ingredients)
      .then(res => {
        if(res.success) {
          dispatch({type: SET_ORDER_DETAILS, payload: res});
          dispatch({type: CLEAR_INGREDIENTS_IN_ORDER});
        } else {
          throw Error(res);
        }
      })
      .catch(error => {
        console.log(`SEND_ORDER_ERROR: ${error}`);
        dispatch(setErrorMessage('Ошибка при отправке заказа.'));
        setTimeout(() => {
          dispatch(setErrorMessage(''));
        }, 3000);
      })
      .finally(() => dispatch(setLoading(false)));
  }
};

export const closeModals: AppThunk = () => {
  return (dispatch: AppDispatch) => {
    dispatch({type: CLEAR_INGREDIENT_DETAILS});
    dispatch({type: CLEAR_ORDER_INFO});
  }
};