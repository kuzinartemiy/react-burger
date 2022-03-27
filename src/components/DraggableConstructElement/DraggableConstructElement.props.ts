import { TIngredientType } from "../../services/types";

export interface IDraggableConstructElementProps {
  ingredient: TIngredientType;
  handleDeleteIngredient: Function;
  index: number;
}