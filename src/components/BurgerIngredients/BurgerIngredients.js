import styles from './BurgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState, useRef } from 'react';
import { IngredientsList } from '../IngredientsList/IngredientsList';
import { useSelector } from 'react-redux';

export const BurgerIngredients = () => {
  const { ingredients } = useSelector(store => ({
    ingredients: store.ingredients,
  }));
  
  const [current, setCurrent] = useState('buns');
  
  const bunsRef = useRef(null);
  const saucesRef = useRef(null);
  const mainsRef = useRef(null);

  const scrollHandler = (evt) => {
    const scrollContainer = evt.target;
    const scrollPosition = scrollContainer.scrollTop;
    
    const saucesSectionPosition = saucesRef.current.offsetTop;
    const mainsSectionPosition = mainsRef.current.offsetTop;

    if(scrollPosition + 40 >= mainsSectionPosition) {
      setCurrent('mains')
    } else if(scrollPosition + 40 >= saucesSectionPosition) {
      setCurrent('sauces')
    } else {
      setCurrent('buns')
    };
  }

  const clickTabHandler = (value, element) => {
    setCurrent(value);
    element.current.scrollIntoView({ behavior: 'smooth'});
  }

  const buns = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter(ingredient => ingredient.type === 'main'), [ingredients]);

  return (
    <div className={styles.burgerIngredients}>
      <h1 className="text text_type_main-large test">Соберите бургер</h1>
      
      <div className={styles.burgerIngredients__tabs}>
        <Tab value="buns" active={current === 'buns'} onClick={(value) => clickTabHandler(value, bunsRef)}>
          Булки
        </Tab>
        <Tab value="sauces" active={current === 'sauces'} onClick={(value) => clickTabHandler(value, saucesRef)}>
          Соусы
        </Tab>
        <Tab value="mains" active={current === 'mains'} onClick={(value) => clickTabHandler(value, mainsRef)}>
          Начинки
        </Tab>
      </div>

      <div onScroll={scrollHandler} className={styles.burgerIngredients__tabsContent}>
        <IngredientsList ref={bunsRef} title="Булки" ingredients={buns} />
        <IngredientsList ref={saucesRef} title="Соусы" ingredients={sauces} />
        <IngredientsList ref={mainsRef} title="Начинки" ingredients={mains} />
      </div>
    </div>
  )
}