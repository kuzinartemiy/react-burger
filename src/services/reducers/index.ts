import thunk from 'redux-thunk';
import {
  combineReducers, createStore, compose, applyMiddleware,
} from 'redux';
import {
  ADD_INGREDIENT_TO_ORDER,
  CLEAR_ORDER_INFO,
  DELETE_INGREDIENT_FROM_ORDER,
  GET_INGREDIENTS,
  SET_ERROR_MESSAGE,
  SORT_INGREDIENT_IN_ORDER,
  CLEAR_INGREDIENTS_IN_ORDER,
  SET_ORDER_DETAILS,
  SET_USER,
  CLEAR_USER,
  SET_USER_AUTH,
  SET_LOADING,
} from '../constants';
import {
  TIngredientType, TInitialSelectedIngredientsState, TOrderDetails, TUserType,
} from '../../services/types';
import {
  IAddIngredientToOrder,
  IClearIngredientsInOrder,
  IDeleteIngredientFromOrder,
  IIngredients,
  IOrderDetails,
  ISetErrorMessage,
  ISetLoading,
  ISortIngredientInOrder,
} from '../actions';

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

const ingredients = (state: Array<TIngredientType> = [], action: IIngredients) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.payload;
    default:
      return state;
  }
};

const initialSelectedIngredientsState: TInitialSelectedIngredientsState = {
  ingredients: [],
  bun: {
    _id: '',
    name: '',
    type: '',
    proteins: 0,
    fat: 0,
    carbohydrates: 0,
    calories: 0,
    price: 0,
    image: '',
    image_mobile: '',
    image_large: '',
    __v: 0,
    customId: '',
  },
};

const selectedIngredients = (
  state: TInitialSelectedIngredientsState = initialSelectedIngredientsState,
  action: IAddIngredientToOrder | ISortIngredientInOrder | IDeleteIngredientFromOrder | IClearIngredientsInOrder,
) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_ORDER:
      if (action.payload.type === 'bun') {
        return { ...state, bun: action.payload };
      }
      return { ...state, ingredients: [...state.ingredients, { ...action.payload }] };

    case SORT_INGREDIENT_IN_ORDER:
      return { ...state, ingredients: action.payload };
    case DELETE_INGREDIENT_FROM_ORDER:
      return {
        ...state,
        ingredients: [...state.ingredients.filter((ingredient: TIngredientType) => ingredient.customId !== action.payload)],
      };
    case CLEAR_INGREDIENTS_IN_ORDER:
      return initialSelectedIngredientsState;
    default:
      return state;
  }
};

const orderDetailsInitialState: TOrderDetails = {
  success: false,
  name: '',
  order: {
    number: 0,
  },
};

const orderDetails = (state: TOrderDetails = orderDetailsInitialState, action: IOrderDetails) => {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return action.payload;
    case CLEAR_ORDER_INFO:
      return orderDetailsInitialState;
    default:
      return state;
  }
};

const isAuth = (state:boolean = false, action: any) => {
  switch (action.type) {
    case SET_USER_AUTH:
      return action.payload;
    default:
      return state;
  }
};

const user = (state: TUserType | null = null, action: any) => {
  switch (action.type) {
    case SET_USER:
      return action.payload;
    case CLEAR_USER:
      return null;
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
