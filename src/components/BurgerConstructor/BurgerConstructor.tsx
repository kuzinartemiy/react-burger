import styles from './BurgerConstructor.module.css';
import { useMemo } from 'react';
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from '../../services/hooks';

import { ConstructorElement, Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { addIngredientToOrder, deleteIngredientFromOrder } from '../../services/actions';
import { DraggableConstructElement } from '../DraggableConstructElement/DraggableConstructElement';
import burgerLogo from '../../images/burgerLogo.svg';
import { TBurgerConstructorProps } from './BurgerConstructor.props';
import { TIngredientType } from '../../services/types';

export const BurgerConstructor = ({ sendOrder }: TBurgerConstructorProps): JSX.Element => {
  const dispatch = useDispatch();

  const { selectedIngredients, selectedBun } = useSelector(store => ({
    selectedIngredients: store.selectedIngredients.ingredients,
    selectedBun: store.selectedIngredients.bun,
  }))
  
  const totalOrderPrice = useMemo(() => {
    const initialPrice = selectedBun.price ? selectedBun.price : 0;
    if(selectedIngredients.length) {
      return selectedIngredients.reduce((acc: number, ingredient: TIngredientType) => acc + ingredient.price, initialPrice);
    } else {
      return initialPrice;
    }
  },[selectedBun, selectedIngredients])
  
  const isOrderCorrect = selectedIngredients.length !== 0 && Object.keys(selectedBun).length !== 0;
  
  const handleSendOrder = () => {
    const ingredientsIds = [selectedBun._id];
    selectedIngredients.forEach((ingredient: TIngredientType) => ingredientsIds.push(ingredient._id));
    sendOrder(ingredientsIds);
  }

  const handleDeleteIngredient = (customId: string) => {
    dispatch(deleteIngredientFromOrder(customId));
  }

  const [{isHover}, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(ingredient: TIngredientType) {
      dispatch(addIngredientToOrder(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  const boxShadow = isHover ? '0px 0px 8px 4px rgba(128, 26, 178, 0.7)' : 'none';

  return (
    <div className={styles.burgerConstructor}>
              
        <div style={{boxShadow}} ref={dropTarget} className={styles.burgerConstructor__constructorWrapper}>
            <div className={styles.burgerConstructor__elementWrapper}>
              <ConstructorElement
                isLocked={true}
                type='top'
                text={Object.keys(selectedBun).length !== 0 ? `${selectedBun.name} (верх)` : 'Выберите булочку'}
                price={Object.keys(selectedBun).length !== 0 ? selectedBun.price : 0}
                thumbnail={Object.keys(selectedBun).length !== 0 ? selectedBun.image : burgerLogo}
              />
            </div>

            {selectedIngredients.length !== 0 &&
              <ul className={styles.burgerConstructor__ingredients}>
                {selectedIngredients.map((ingredient: TIngredientType, index: number) => {
                  return (
                    <DraggableConstructElement
                      key={ingredient.customId}
                      handleDeleteIngredient={handleDeleteIngredient} 
                      ingredient={ingredient} 
                      index={index}
                    />
                  )
                })}
              </ul>
            }

            <div className={styles.burgerConstructor__elementWrapper}>
              <ConstructorElement
                isLocked={true}
                type='bottom'
                text={Object.keys(selectedBun).length !== 0 ? `${selectedBun.name} (низ)` : 'Выберите булочку'}
                price={Object.keys(selectedBun).length !== 0 ? selectedBun.price : 0}
                thumbnail={Object.keys(selectedBun).length !== 0 ? selectedBun.image : burgerLogo}
              />
            </div>
        </div>
      
      <div className={styles.burgerConstructor__totalSubmit}>
        <p className="text text_type_digits-medium">
          {totalOrderPrice}<CurrencyIcon type="primary" />
        </p>
        <Button disabled={!isOrderCorrect} onClick={handleSendOrder} type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  )
}