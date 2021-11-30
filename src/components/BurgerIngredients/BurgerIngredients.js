import styles from './BurgerIngredients.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from 'react';
import { IngredientsList } from '../IngredientsList/IngredientsList';

export const BurgerIngredients = ({ingredients}) => {
  const [current, setCurrent] = useState('buns');

  const buns = ingredients.filter(ingredient => ingredient.type === 'bun');
  const sauces = ingredients.filter(ingredient => ingredient.type === 'sauce');
  const mains = ingredients.filter(ingredient => ingredient.type === 'main');

  return (
    <div className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large test">Соберите бургер</h1>
      <div className={styles.burgerIngredients__tabs} style={{ display: 'flex' }}>
        <Tab value="buns" active={current === 'buns'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      
      {current === 'buns' && 
        <div className={styles.burgerIngredients__tabsContent}>
          <IngredientsList title="Булки" ingredients={buns} />
          <IngredientsList title="Соусы" ingredients={sauces} />
          <IngredientsList title="Начинки" ingredients={mains} />
        </div>
      }
      
      {current === 'sauces' && 
        <div className={styles.burgerIngredients__tabsContent}>
          <IngredientsList title="Соусы" ingredients={sauces} />
          <IngredientsList title="Начинки" ingredients={mains} />
          <IngredientsList title="Булки" ingredients={buns} />
        </div>
      }

      {current === 'mains' && 
        <div className={styles.burgerIngredients__tabsContent}>
          <IngredientsList title="Начинки" ingredients={mains} />
          <IngredientsList title="Булки" ingredients={buns} />
          <IngredientsList title="Соусы" ingredients={sauces} />
        </div>
      }

    </div>
  )
}