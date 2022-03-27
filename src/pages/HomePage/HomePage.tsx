import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor';
import { Loader } from '../../components/Loader/Loader';
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients';
import { useSelector } from '../../services/hooks';
import styles from './HomePage.module.css';

export const HomePage = () => {
  const { ingredients, isLoading } = useSelector((store) => ({
    ingredients: store.ingredients,
    isLoading: store.isLoading,
  }));

  return (
    <div>
      {isLoading
        ? <Loader />
        : (
          <div>
            {ingredients.length
            && (
            <DndProvider backend={HTML5Backend}>
              <div className={styles.homePage}>
                <BurgerIngredients />
                <BurgerConstructor />
              </div>
            </DndProvider>
            )}
          </div>
        )}
    </div>
  );
};
