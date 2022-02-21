import thunk from 'redux-thunk';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { 
  ADD_INGREDIENT_TO_ORDER,
  CLEAR_INGREDIENT_DETAILS,
  CLEAR_ORDER_INFO,
  DELETE_INGREDIENT_FROM_ORDER,
  GET_INGREDIENTS,
  SET_ERROR_MESSAGE, 
  SORT_INGREDIENT_IN_ORDER,
  SET_INGREDIENT_DETAILS,
  SET_LOADING_ON,
  SET_LOADING_OFF,
  CLEAR_INGREDIENTS_IN_ORDER,
  SET_ORDER_DETAILS
} from '../constants';
import { TIngredientType, TOrderDetails } from '../../services/types';
import { IIngredientDetails, IIngredients, IOrderDetails, ISetErrorMessage, ISetLoading } from '../actions';

export type TInitialSelectedIngredientsState = {
  ingredients: Array<TIngredientType>;
  bun: object;
}

const isLoading = (state: boolean = true, action: ISetLoading) => {
  switch (action.type) {
    case SET_LOADING_OFF:
      return false;
    case SET_LOADING_ON: 
      return true;
    default:
      return state;
  }
}

const errorMessage = (state: string = '', action: ISetErrorMessage) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const ingredients = (state: Array<TIngredientType> = [], action: IIngredients) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.payload;
    default:
      return state;
  }
}

const ingredientDetailsInitialState = {
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
}

const ingredientDetails = (state: TIngredientType = ingredientDetailsInitialState, action: IIngredientDetails) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS:
      if(action.payload) {
        return action.payload;
      } else {
        return ingredientDetailsInitialState;
      }
    case CLEAR_INGREDIENT_DETAILS:
      return ingredientDetailsInitialState;
    default:
      return state;
  }
}

const initialSelectedIngredientsState: TInitialSelectedIngredientsState = {
  ingredients: [],
  bun: {}
}

const selectedIngredients = (state = initialSelectedIngredientsState, action: any) => {
  switch (action.type) {
    case ADD_INGREDIENT_TO_ORDER:
      if(action.payload.type === 'bun') {
        return {...state, bun: action.payload};
      } else {
        return {...state, ingredients: [...state.ingredients, {...action.payload}]};
      }
    case SORT_INGREDIENT_IN_ORDER:
      return {...state, ingredients: action.payload}
    case DELETE_INGREDIENT_FROM_ORDER:
      return {
        ...state,
        ingredients: [...state.ingredients.filter(ingredient => ingredient.customId !== action.payload)]
      };
    case CLEAR_INGREDIENTS_IN_ORDER:
      return initialSelectedIngredientsState;
    default:
      return state;
  }
}

const orderDetailsInitialState = {
  success: false,
  name: '',
  order: {
    number: 0,
  },
}

const orderDetails = (state: TOrderDetails = orderDetailsInitialState, action: IOrderDetails) => {
  switch(action.type) {
    case SET_ORDER_DETAILS:
      return action.payload;
    case CLEAR_ORDER_INFO:
      return orderDetailsInitialState;
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  ingredients,
  ingredientDetails,
  selectedIngredients,
  isLoading,
  errorMessage,
  orderDetails,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));