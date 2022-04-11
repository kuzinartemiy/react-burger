import thunk from 'redux-thunk';
import {
  combineReducers, createStore, compose, applyMiddleware,
} from 'redux';
import {
  SET_ERROR_MESSAGE,
  SET_LOADING,
  WS_CLOSE_CONNECTION,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_CUSTOM_URL_CONNECTION_START,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE,
} from '../constants';
import { isAuth, user } from './user';
import {
  feedOrders, ingredients, orderDetails, selectedIngredients,
} from './ingredients';
import { ISetLoading, ISetErrorMessage } from '../actions/interfaces';
import { socketMiddleware } from '../middlewares/socketMiddleware';

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

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsCustomUrlInit: WS_CUSTOM_URL_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  wsSendMessage: WS_SEND_MESSAGE,
  onOrder: WS_GET_ORDERS,
  wsClose: WS_CLOSE_CONNECTION,
};

const rootReducer = combineReducers({
  feedOrders,
  ingredients,
  selectedIngredients,
  isLoading,
  errorMessage,
  orderDetails,
  user,
  isAuth,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk), applyMiddleware(socketMiddleware(wsUrl, wsActions))));
