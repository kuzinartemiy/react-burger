import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState } from 'react';
import { IngredientsList } from '../IngredientsList/IngredientsList';
import PropTypes from 'prop-types';
import { IngredientType } from '../../utils/types';

export const BurgerIngredients = ({ ingredients, openModal }) => {
  const [current, setCurrent] = useState('buns');

  const clickTabHandler = (value) => {
    const activeIngredientList = document.getElementById(value);
    activeIngredientList.scrollIntoView({ behavior: 'smooth'});
    setCurrent(value);
  }

  const buns = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'main'), [ingredients]);

  return (
    <div className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large test">Соберите бургер</h1>
      
      <div className={styles.burgerIngredients__tabs}>
        <Tab value="buns" active={current === 'buns'} onClick={clickTabHandler}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={clickTabHandler}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={clickTabHandler}>
          Начинки
        </Tab>
      </div>

      <div className={styles.burgerIngredients__tabsContent}>
        <IngredientsList openModal={openModal} title="Булки" ingredients={buns} />
        <IngredientsList openModal={openModal} title="Соусы" ingredients={sauces} />
        <IngredientsList openModal={openModal} title="Начинки" ingredients={mains} />
      </div>
    </div>
  )
}

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(PropTypes.shape(IngredientType).isRequired).isRequired,
  openModal: PropTypes.func.isRequired,
};