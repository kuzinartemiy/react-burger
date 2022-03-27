import styles from './App.module.css';

import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/hooks';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { closeModals, getIngredients, sendOrder } from '../../services/actions';

import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';
import { Loader } from '../Loader/Loader';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';

function App(): JSX.Element {
  const dispatch = useDispatch();
  
  const { ingredients, 
    ingredientDetails, 
    orderDetails,
    isLoading,
    errorMessage,
  } = useSelector((store) => ({
    ingredients: store.ingredients,
    ingredientDetails: store.ingredientDetails,
    orderDetails: store.orderDetails,
    isLoading: store.isLoading,
    errorMessage: store.errorMessage
  }))
  
  const closeModal = () => {
    dispatch(closeModals());
  }

  const sendOrderHandler = (ingredients: Array<string>) => {
    dispatch(sendOrder(ingredients));
  }

  useEffect(() => {
    dispatch(getIngredients());
      //eslint-disable-next-line
  }, [])
  
  return (
    <>
      <AppHeader/>
      {isLoading 
        ? 
        <Loader />
        : 
        <>
          {ingredients.length &&
            <DndProvider backend={HTML5Backend}>
              <div className={styles.appWrapper}>
                <BurgerIngredients />
                <BurgerConstructor sendOrder={sendOrderHandler}/>
              </div>
            </DndProvider>
          }
          
          {orderDetails && orderDetails.success && 
            <Modal closeModal={closeModal}>
              <OrderDetails />
            </Modal>
          }
    
          {ingredientDetails.name &&
            <Modal closeModal={closeModal}>
              <IngredientDetails />
            </Modal>
          }
    
        </>
      }
      
      {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
    </>
  );
}

export default App;