import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerConstructor } from '../../components/BurgerConstructor/BurgerConstructor';
import { Loader } from '../../components/Loader/Loader';
import { BurgerIngredients } from '../../components/BurgerIngredients/BurgerIngredients';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './HomePage.module.css';
import { OrderDetails } from '../../components/OrderDetails/OrderDetails';
import { Modal } from '../../components/Modal/Modal';
import { setOrderDetails } from '../../services/actions/ingredients';

export const HomePage = () => {
  const dispatch = useDispatch();
  const { ingredients, isLoading, orderDetails } = useSelector((store) => ({
    ingredients: store.ingredients,
    isLoading: store.isLoading,
    orderDetails: store.orderDetails,
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
            {orderDetails
            && (
              <Modal extCloseModal={() => dispatch(setOrderDetails(null))}>
                <OrderDetails />
              </Modal>
            )}
          </div>
        )}
    </div>
  );
};
