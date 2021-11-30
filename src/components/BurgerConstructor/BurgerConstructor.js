import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const BurgerConstructor = ({ingredients}) => {
  const selectedBun = ingredients[0]; //hardcode bun
  const filteredIngredients = ingredients.filter(ingredient => ingredient.type !== 'bun');

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

        {filteredIngredients.map(ingredient => {
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
          610<CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  )
}

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.object),
}