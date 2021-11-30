import styles from './BurgerConstructor.module.css';
import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructor = ({ingredients}) => {
  return (
    <div className={styles.burgerConstructor}>
      <ul className={styles.burgerConstructor__ingredients}>
        {ingredients.map(ingredient => {
          return (
            <li key={ingredient._id} className={styles.burgerConstructor__ingredient}>
              <DragIcon type="primary" />
              <ConstructorElement
                type={(ingredient === ingredients[0] && 'top') || ingredient === ingredients[ingredients.length - 1] && 'bottom'}
                text={ingredient.name}
                price={ingredient.price}
                thumbnail={ingredient.image}
              />
            </li>
          )
        })}
      </ul>
      <div className={styles.burgerConstructor__totalSubmit}>
        <p className="text text_type_digits-medium">
          610<CurrencyIcon type="primary" />
        </p>
        <Button type="primary" size="large">Оформить заказ</Button>
      </div>
    </div>
  )
}