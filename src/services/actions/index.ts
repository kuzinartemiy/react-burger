/* eslint-disable no-unused-expressions */

import {
  SET_ERROR_MESSAGE,
  SET_LOADING,
} from '../constants';
import {
  ISetLoading,
  ISetErrorMessage,
} from './interfaces';

export const setLoading = (flag: boolean): ISetLoading => ({
  type: SET_LOADING,
  payload: flag,
});

export const setErrorMessage = (errorMessage: string): ISetErrorMessage => ({
  type: SET_ERROR_MESSAGE,
  payload: errorMessage,
});
