import Api from '../../utils/api';
import { nanoid } from 'nanoid';

export const SET_LOADING_OFF = 'SET_LOADING_OFF';
export const SET_LOADING_ON = 'SET_LOADING_ON';

export const GET_INGREDIENTS = 'GET_INGREDIENTS';

export const SET_INGREDIENT_DETAILS = 'SET_INGREDIENT_DETAILS';
export const CLEAR_INGREDIENT_DETAILS = 'CLEAR_INGREDIENT_DETAILS';

export const ADD_INGREDIENT_TO_ORDER = 'ADD_INGREDIENT_TO_ORDER';
export const DELETE_INGREDIENT_FROM_ORDER = 'DELETE_INGREDIENT_FROM_ORDER';
export const SORT_INGREDIENT_IN_ORDER = 'MOVE_INSIDE_CONSTRUCTOR';

export const SEND_ORDER = 'SEND_ORDER';
export const CLEAR_ORDER_INFO = 'CLEAR_ORDER_INFO';

export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';

const addIngredients = (ingredients) => {
  return {
    type: GET_INGREDIENTS,
    payload: ingredients
  };
};

const setLoading = (flag) => {
  return flag ? { type: SET_LOADING_ON } : { type: SET_LOADING_OFF };
};

const setErrorMessage = (errorMessage) => {
  return {
    type: SET_ERROR_MESSAGE,
    payload: errorMessage,
  };
};

export const getIngredients = () => {
  return (dispatch) => {
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

export const sendOrder = (ingredients) => {
  return (dispatch) => {
    dispatch(setLoading(true));
    Api.sendOrder(ingredients)
      .then(res => {
        if(res.success) {
          dispatch({type: SEND_ORDER, payload: res});
          dispatch({ type: SET_LOADING_OFF });
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

export const closeModals = () => {
  return (dispatch) => {
    dispatch({type: CLEAR_INGREDIENT_DETAILS});
    dispatch({type: CLEAR_ORDER_INFO});
  }
};

export const addIngredientToOrder = (ingredient) => {
  ingredient.customId = nanoid(10);
  return {
    type: ADD_INGREDIENT_TO_ORDER,
    payload: ingredient,
  }
};

export const deleteIngredientFromOrder = (customId) => {
  return {
    type: DELETE_INGREDIENT_FROM_ORDER,
    payload: customId,
  }
};

export const sortIngredientInOrder = (sortedIngredients) => {
  return {
    type: SORT_INGREDIENT_IN_ORDER,
    payload: sortedIngredients,
  }
};

export const setIngredientDetails = (ingredientDetails) => {
  return {
    type: SET_INGREDIENT_DETAILS,
    payload: ingredientDetails
  }
};