import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useContext, useEffect, useState, useReducer } from 'react';
import { IngredientsContext } from '../../contexts/ingredientsContext';

function reducer(state, action) {
  switch (action.type) {
    case 'calculateOrderTotalPrice':
      return action.payload.reduce((acc, ingredient) => acc + ingredient.price, state);
    default:
      throw new Error();
  }
}

export const BurgerConstructor = ({ sendOrder }) => {
  const ingredients = useContext(IngredientsContext);
  const [selectedBun, setSelectedBun] = useState(ingredients.find(ingredient => ingredient.type === 'bun'));
  const [selectedIngredients, setSelectedIngredients] = useState(ingredients.filter(ingredient => ingredient.type !== 'bun'));
  const [orderTotalPrice, setTotalOrderPrice] = useReducer(reducer, selectedBun.price);

  useEffect(() => {
    setTotalOrderPrice({ type: 'calculateOrderTotalPrice', payload: selectedIngredients });
  }, [ingredients]);

  const handleSendOrder = () => {
    const ingredientsIds = [selectedBun._id];
    selectedIngredients.forEach(ingredient => ingredientsIds.push(ingredient._id));
    sendOrder(ingredientsIds);
  }

  return (
    <div className={styles.burgerConstructor}>
      <div className={styles.burgerConstructor__elementWrapper}>
        <ConstructorElement
          isLocked={true}
          type='top'
          text={`${selectedBun.name} (верх)`}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
      </div>
      
      <ul className={styles.burgerConstructor__ingredients}>
        {selectedIngredients.map(ingredient => {
          return (
            <li key={ingredient._id} className={styles.burgerConstructor__ingredient}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          )
        })}
      </ul>

      <div className={styles.burgerConstructor__elementWrapper}>
        <ConstructorElement
          isLocked={true}
          type='bottom'
          text={`${selectedBun.name} (низ)`}
          price={selectedBun.price}
          thumbnail={selectedBun.image}
        />
      </div>

      <div className={styles.burgerConstructor__totalSubmit}>
        <p className="text text_type_digits-medium">
          {orderTotalPrice}<CurrencyIcon type="primary" />
        </p>
        <Button onClick={handleSendOrder} type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  sendOrder: PropTypes.func.isRequired,
}