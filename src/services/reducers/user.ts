import { CLEAR_USER, SET_USER, SET_USER_AUTH } from '../constants';
import { TUserType } from '../types';

export const isAuth = (state:boolean = false, action: any) => {
  switch (action.type) {
    case SET_USER_AUTH:
      return action.payload;
    default:
      return state;
  }
};

export const user = (state: TUserType | null = null, action: any) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return null;
    default:
      return state;
  }
};
