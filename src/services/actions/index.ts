/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
import { nanoid } from 'nanoid';
import Api from '../../utils/api';
import {
  AppThunk, AppDispatch, TIngredientType, TOrderDetails, TUserType,
} from '../types';

import {
  GET_INGREDIENTS,
  ADD_INGREDIENT_TO_ORDER,
  DELETE_INGREDIENT_FROM_ORDER,
  SORT_INGREDIENT_IN_ORDER,
  CLEAR_INGREDIENTS_IN_ORDER,
  CLEAR_ORDER_INFO,
  SET_ERROR_MESSAGE,
  SET_ORDER_DETAILS,
  SET_TOKEN,
  SET_USER_AUTH,
  SET_USER,
  SET_LOADING,
  CLEAR_USER,
} from '../constants';

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

const addIngredients = (ingredients: Array<TIngredientType>): IAddIngredients => ({
  type: GET_INGREDIENTS,
  payload: ingredients,
});

const setLoading = (flag: boolean): ISetLoading => ({
  type: SET_LOADING,
  payload: flag,
});

const setErrorMessage = (errorMessage: string): ISetErrorMessage => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMessage,
});

const setUserData = (userData: TUserType): ISetUserData => ({
  type: SET_USER,
  payload: userData,
});

const clearUserData = () => ({ type: CLEAR_USER });

const setIsAuth = (flag: boolean) => ({
  type: SET_USER_AUTH,
  payload: flag,
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

export const resetPassword: AppThunk = (email: string) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  Api.resetPassword(email)
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(`RESET_PASSWORD_ERROR: ${error}`);
      dispatch(setErrorMessage('Ошибка при сбросе пароля.'));
      setTimeout(() => {
        dispatch(setErrorMessage(''));
      }, 3000);
    })
    .finally(() => dispatch(setLoading(false)));
};

export const setNewPassword: AppThunk = (password: string, token: string) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  Api.setNewPassword(password, token)
    .then((res) => console.log(res))
    .catch((error) => {
      console.log(`SET_NEW_PASSWORD_ERROR: ${error}`);
      dispatch(setErrorMessage('Ошибка при установке нового пароля.'));
      setTimeout(() => {
        dispatch(setErrorMessage(''));
      }, 3000);
    })
    .finally(() => dispatch(setLoading(false)));
};

export const registerUser: AppThunk = (email: string, password: string, name: string) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  Api.registerUser(email, password, name)
    .then((res) => {
      if (res.success) {
        dispatch(setUserData(res.user));
        dispatch(setIsAuth(true));
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
      }
    })
    .catch((error) => {
      console.log(`REGISTER_USER_ERROR: ${error}`);
      dispatch(setErrorMessage('Ошибка при регистрации нового пользователя.'));
      setTimeout(() => {
        dispatch(setErrorMessage(''));
      }, 3000);
    })
    .finally(() => dispatch(setLoading(false)));
};

export const login: AppThunk = (email: string, password: string) => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  Api.login(email, password)
    .then((res) => {
      if (res.success) {
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
        dispatch(setUserData(res.user));
        dispatch(setIsAuth(true));
      }
    })
    .catch(() => {
      dispatch(setErrorMessage('Ошибка при авторизации пользователя.'));
      setTimeout(() => {
        dispatch(setErrorMessage(''));
      }, 3000);
    })
    .finally(() => dispatch(setLoading(false)));
};

export const resetRefreshToken = (next: any) => (dispatch: AppDispatch) => {
  const token = localStorage.getItem('refreshToken');
  if (token) {
    Api.resetRefreshToken()
      .then((res) => {
        if (res.success) {
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          dispatch(next);
        }
      })
      .catch((error) => {
        localStorage.removeItem('accessToken');
        console.log(`REFRESH_TOKEN_ERROR: ${error}`);
        dispatch(setErrorMessage('Ошибка при обновлении токена.'));
        setTimeout(() => {
          dispatch(setErrorMessage(''));
        }, 3000);
      });
  } else {
    console.log('REFRESH_TOKEN_ERROR: NO TOKEN');
    dispatch(setErrorMessage('Ошибка при получении токена.'));
    setTimeout(() => {
      dispatch(setErrorMessage(''));
    }, 3000);
  }
};

export const logout = () => (dispatch: AppDispatch) => {
  Api.logout()
    .then((res) => {
      if (res.success) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch(clearUserData());
      }
    })
    .catch((error) => {
      console.log(`LOGOUT_ERROR: ${error}`);
      dispatch(setErrorMessage('Ошибка при выходе из профиля'));
      setTimeout(() => {
        dispatch(setErrorMessage(''));
      }, 3000);
    })
    .finally(() => dispatch(setIsAuth(false)));
};

export const getUser = () => (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  const token = localStorage.getItem('accessToken');

  token && Api.getUser()
    .then((res) => {
      if (res.success) {
        dispatch(setUserData(res.user));
        dispatch(setIsAuth(true));
      }
    })
    .catch((error) => {
      if (error.status === 403) {
        dispatch(resetRefreshToken(getUser));
        dispatch(getUser());
      } else if (error.status === 401) {
        dispatch(setErrorMessage('Ошибка авторизации.'));
        setTimeout(() => {
          dispatch(setErrorMessage(''));
        }, 3000);
      } else {
        dispatch(setErrorMessage('Ошибка получения данных пользователя.'));
        setTimeout(() => {
          dispatch(setErrorMessage(''));
        }, 3000);
      }
      console.log(`GET_USER_ERROR: ${error.message}`);
    })
    .finally(() => dispatch(setLoading(false)));
};

export const updateUser = (data: {name: string, email: string, password: string}) => (dispatch: AppDispatch) => {
  const { name, email, password } = data;
  Api.updateUser(name, email, password)
    .then((res) => {
      if (res.ok) {
        dispatch(setUserData(res.user));
      }
    })
    .catch((error) => {
      if (error.status === 403) {
        dispatch(resetRefreshToken(updateUser(data)));
        dispatch(updateUser(data));
      }
      console.log(`GET_USER_ERROR: ${error}`);
      dispatch(setErrorMessage('Ошибка при получении данных пользователя.'));
      setTimeout(() => {
        dispatch(setErrorMessage(''));
      }, 3000);
    });
};
