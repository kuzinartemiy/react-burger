import {
  IIngredients, IAddIngredientToOrder, ISortIngredientInOrder, IDeleteIngredientFromOrder, IClearIngredientsInOrder, IOrderDetails,
} from '../actions/interfaces';
import {
  GET_INGREDIENTS, ADD_INGREDIENT_TO_ORDER, SORT_INGREDIENT_IN_ORDER, DELETE_INGREDIENT_FROM_ORDER, CLEAR_INGREDIENTS_IN_ORDER, SET_ORDER_DETAILS,
} from '../constants';
import { TIngredientType, TInitialSelectedIngredientsState, TOrderDetails } from '../types';

export const ingredients = (state: Array<TIngredientType> = [], action: IIngredients) => {
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

export const selectedIngredients = (
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

export const orderDetails = (state: TOrderDetails | null = null, action: IOrderDetails) => {
  switch (action.type) {
    case SET_ORDER_DETAILS:
      return action.payload;
    default:
      return state;
  }
};
