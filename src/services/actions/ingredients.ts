/* eslint-disable no-console */
import { nanoid } from 'nanoid';
import Api from '../../utils/api';
import { setLoading, setErrorMessage } from '.';
import {
  ADD_INGREDIENT_TO_ORDER, DELETE_INGREDIENT_FROM_ORDER, SORT_INGREDIENT_IN_ORDER, GET_INGREDIENTS, SET_ORDER_DETAILS, CLEAR_INGREDIENTS_IN_ORDER,
} from '../constants';
import {
  TIngredientType, TOrderDetails, AppThunk, AppDispatch,
} from '../types';
import {
  IAddIngredientToOrder, IDeleteIngredientFromOrder, ISortIngredientInOrder, IAddIngredients,
} from './interfaces';

export const addIngredientToOrder = (ingredient: TIngredientType): IAddIngredientToOrder => {
  // eslint-disable-next-line no-param-reassign
  ingredient.customId = nanoid(10);
  return {
    type: ADD_INGREDIENT_TO_ORDER,
    payload: ingredient,
  };
};

export const deleteIngredientFromOrder = (customId: string): IDeleteIngredientFromOrder => ({
  type: DELETE_INGREDIENT_FROM_ORDER,
  payload: customId,
});

export const sortIngredientInOrder = (sortedIngredients: Array<TIngredientType>): ISortIngredientInOrder => ({
  type: SORT_INGREDIENT_IN_ORDER,
  payload: sortedIngredients,
});

export const addIngredients = (ingredients: Array<TIngredientType>): IAddIngredients => ({
  type: GET_INGREDIENTS,
  payload: ingredients,
});
export const setOrderDetails = (orderDetails: TOrderDetails | null) => ({
  type: SET_ORDER_DETAILS,
  payload: orderDetails,
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  Api.getIngredients()
    .then((res) => {
      if (res.success) {
        dispatch(addIngredients(res.data));
        dispatch(setLoading(false));
      } else {
        throw Error(res);
      }
    })
    .catch((error) => {
      console.log(`GET_INGREDIENTS_ERROR: ${error}`);
      dispatch(setErrorMessage('Ошибка при получении ингредиентов.'));
      setTimeout(() => {
        dispatch(setErrorMessage(''));
      }, 3000);
    });
};

export const sendOrder: AppThunk = (ingredients: Array<string>) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  Api.sendOrder(ingredients)
    .then((res) => {
      if (res.success) {
        dispatch(setOrderDetails(res));
        dispatch({ type: CLEAR_INGREDIENTS_IN_ORDER });
      } else {
        throw Error(res);
      }
    })
    .catch((error) => {
      console.log(`SEND_ORDER_ERROR: ${error}`);
      dispatch(setErrorMessage('Ошибка при отправке заказа.'));
      setTimeout(() => {
        dispatch(setErrorMessage(''));
      }, 3000);
    })
    .finally(() => dispatch(setLoading(false)));
};
