import styles from './BurgerIngredients.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useMemo, useState, useRef, RefObject, UIEvent } from 'react';
import { IngredientsList } from '../IngredientsList/IngredientsList';
import { useSelector } from '../../services/hooks';
import { TIngredientType } from '../../services/types';

export const BurgerIngredients = ():JSX.Element => {
  const { ingredients } = useSelector(store => ({
    ingredients: store.ingredients,
  }));
  
  const [current, setCurrent] = useState('buns');
  
  const bunsRef = useRef<HTMLDivElement>(null);
  const saucesRef = useRef<HTMLDivElement>(null);
  const mainsRef = useRef<HTMLDivElement>(null);

  const scrollHandler = (evt: UIEvent<HTMLDivElement>) => {
    evt.stopPropagation();
    const scrollPosition = evt.currentTarget.scrollTop;

    const saucesSectionPosition: number = saucesRef.current ? saucesRef.current.offsetTop : 0;
    const mainsSectionPosition: number = mainsRef.current ? mainsRef.current.offsetTop : 0;

    if(scrollPosition + 40 >= mainsSectionPosition) {
      setCurrent('mains')
    } else if(scrollPosition + 40 >= saucesSectionPosition) {
      setCurrent('sauces')
    } else {
      setCurrent('buns')
    };
  }

  const clickTabHandler = (value: string, element: RefObject<HTMLDivElement>) => {
    setCurrent(value);
    element.current && element.current.scrollIntoView({ behavior: 'smooth'});
  }

  const buns = useMemo(() => ingredients.filter((ingredient: TIngredientType) => ingredient.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((ingredient: TIngredientType) => ingredient.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((ingredient: TIngredientType) => ingredient.type === 'main'), [ingredients]);

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