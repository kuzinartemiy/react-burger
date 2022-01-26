import styles from './DraggableConstructElement.module.css';
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components"
import { useRef } from "react";
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from "react-redux";
import { sortIngredientInOrder } from "../../services/actions";

export const DraggableConstructElement = ({ ingredient, handleDeleteIngredient, index }) => {
  const { selectedIngredients } = useSelector(store => ({
    selectedIngredients: store.selectedIngredients.ingredients,
  }))

  const ref = useRef(null);
  const dispatch = useDispatch();

  const [, sortDragRef] = useDrag({
    type: 'selectedIngredient',
    item: { index }
  })

  const [{isHover}, sortDropRef] = useDrop({
    accept: 'selectedIngredient',
    hover(item, monitor) {
      const dragElementIndex = item.index;
      const hoverElementIndex = index;
      if (dragElementIndex === hoverElementIndex) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2; 
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragElementIndex < hoverElementIndex && hoverClientY < hoverMiddleY) return;
      if (dragElementIndex > hoverElementIndex && hoverClientY > hoverMiddleY) return;

      const filteredIngredients = selectedIngredients.filter(ingredient => ingredient.customId !== selectedIngredients[dragElementIndex].customId);
      const sortedIngredients = [...filteredIngredients.slice(0, hoverElementIndex), selectedIngredients[dragElementIndex], ...filteredIngredients.slice(hoverElementIndex)];

      dispatch(sortIngredientInOrder(sortedIngredients))
      item.index = hoverElementIndex;
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  })

  const boxShadow = isHover ? '0px 0px 8px 4px rgba(76, 76, 255, 0.7)' : 'none';
  const sortRef = sortDragRef(sortDropRef(ref));

  return (
    <li ref={sortRef} className={styles.DraggableConstructElement}>
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