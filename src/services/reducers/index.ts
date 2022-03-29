import thunk from 'redux-thunk';
import {
  combineReducers, createStore, compose, applyMiddleware,
} from 'redux';
import {
  SET_ERROR_MESSAGE,
  SET_LOADING,
} from '../constants';
import { isAuth, user } from './user';
import { ingredients, orderDetails, selectedIngredients } from './ingredients';
import { ISetLoading, ISetErrorMessage } from '../actions/interfaces';

const isLoading = (state: boolean = true, action: ISetLoading) => {
  switch (action.type) {
    case SET_LOADING:
      return action.payload;
    default:
      return state;
  }
};

const errorMessage = (state: string = '', action: ISetErrorMessage) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  ingredients,
  selectedIngredients,
  isLoading,
  errorMessage,
  orderDetails,
  user,
  isAuth,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
