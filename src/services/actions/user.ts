/* eslint-disable no-console */
import {
  setLoading, setErrorMessage,
} from '.';
import Api from '../../utils/api';
import { CLEAR_USER, SET_USER, SET_USER_AUTH } from '../constants';
import { AppThunk, AppDispatch, TUserType } from '../types';
import { ISetUserData } from './interfaces';

export const setUserData = (userData: TUserType): ISetUserData => ({
  type: SET_USER,
  payload: userData,
});

export const clearUserData = () => ({ type: CLEAR_USER });

export const setIsAuth = (flag: boolean) => ({
  type: SET_USER_AUTH,
  payload: flag,
});

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
        dispatch(resetRefreshToken(getUser()));
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
      if (res.success) {
        dispatch(setUserData(res.user));
      }
    })
    .catch((error) => {
      if (error.status === 403) {
        dispatch(resetRefreshToken(updateUser(data)));
      }
      console.log(`GET_USER_ERROR: ${error}`);
      dispatch(setErrorMessage('Ошибка при получении данных пользователя.'));
      setTimeout(() => {
        dispatch(setErrorMessage(''));
      }, 3000);
    });
};
