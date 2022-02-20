import styles from './DraggableConstructElement.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from "../../services/hooks";
import { sortIngredientInOrder } from "../../services/actions";
import { IDraggableConstructElementProps } from './DraggableConstructElement.props';
import { TIngredientType } from '../../services/types';

export const DraggableConstructElement = ({ ingredient, handleDeleteIngredient, index }: IDraggableConstructElementProps): JSX.Element => {
  const { selectedIngredients } = useSelector(store => ({
    selectedIngredients: store.selectedIngredients.ingredients,
  }))

  const ref = useRef<HTMLLIElement>(null);
  const dispatch = useDispatch();

  const [, sortDragRef] = useDrag({
    type: 'selectedIngredient',
    item: { index }
  })

  const [{isHover}, sortDropRef] = useDrop({
    accept: 'selectedIngredient',
    hover(item: { index: number }, monitor) {    
      const dragElementIndex = item.index;
      const hoverElementIndex = index;
      if (dragElementIndex === hoverElementIndex) return;

      const hoverBoundingRect = ref.current && ref.current.getBoundingClientRect();
      const hoverMiddleY = hoverBoundingRect ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2 : 0; 
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset && hoverBoundingRect) ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragElementIndex < hoverElementIndex && hoverClientY < hoverMiddleY) return;
      if (dragElementIndex > hoverElementIndex && hoverClientY > hoverMiddleY) return;

      const filteredIngredients = selectedIngredients.filter((ingredient: TIngredientType) => ingredient.customId !== selectedIngredients[dragElementIndex].customId);
      const sortedIngredients = [...filteredIngredients.slice(0, hoverElementIndex), selectedIngredients[dragElementIndex], ...filteredIngredients.slice(hoverElementIndex)];

      dispatch(sortIngredientInOrder(sortedIngredients))
      item.index = hoverElementIndex;
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })

  const boxShadow = isHover ? '0px 0px 8px 4px rgba(76, 76, 255, 0.7)' : 'none';
  sortDragRef(sortDropRef(ref));

  return (
    <li ref={ref} className={styles.DraggableConstructElement}>
      <DragIcon type="primary" />
      <div style={{boxShadow}} className={styles.DraggableConstructElement__wrapper}>
        <ConstructorElement
          text={ingredient.name}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() => handleDeleteIngredient(ingredient.customId)}
        />
      </div>
    </li>
  )
}