import thunk from 'redux-thunk';
import { combineReducers, createStore, compose, applyMiddleware } from 'redux';
import { 
  ADD_INGREDIENT_TO_ORDER,
  CLEAR_INGREDIENT_DETAILS,
  CLEAR_ORDER_INFO,
  DELETE_INGREDIENT_FROM_ORDER,
  GET_INGREDIENTS,
  SEND_ORDER, 
  SET_LOADING_OFF, 
  SET_ERROR_MESSAGE, 
  SORT_INGREDIENT_IN_ORDER,
  SET_INGREDIENT_DETAILS,
  SET_LOADING_ON,
  CLEAR_INGREDIENTS_IN_ORDER
  } from '../actions';

const isLoading = (state = true, action) => {
  switch (action.type) {
    case SET_LOADING_OFF:
      return false;
    case SET_LOADING_ON: 
      return true;
    default:
      return state;
  }
}

const errorMessage = (state = '', action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return action.payload;
    default:
      return state;
  }
}

const ingredients = (state = [], action) => {
  switch (action.type) {
    case GET_INGREDIENTS:
      return action.payload;
    default:
      return state;
  }
}

const ingredientDetails = (state = null, action) => {
  switch (action.type) {
    case SET_INGREDIENT_DETAILS:
      return action.payload;
    case CLEAR_INGREDIENT_DETAILS:
      return null;
    default:
      return state;
  }
}

const initialSelectedIngredientsState = {
  ingredients: [],
  bun: {}
}

const selectedIngredients = (state = initialSelectedIngredientsState, action) => {
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

const orderDetails = (state = null, action) => {
  switch (action.type) {
    case SEND_ORDER: 
      return action.payload;
    case CLEAR_ORDER_INFO:
      return null
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  ingredients,
  ingredientDetails,
  selectedIngredients,
  orderDetails,
  isLoading,
  errorMessage,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));