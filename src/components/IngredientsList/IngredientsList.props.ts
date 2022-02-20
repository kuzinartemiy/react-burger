import { TIngredientType } from "../../services/types";

export interface IIngredientListProps {
  title: string;
  ingredients: Array<TIngredientType>;
}