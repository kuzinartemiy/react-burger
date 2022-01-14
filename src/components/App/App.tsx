import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

import { SetStateAction, useEffect, useState } from 'react';
import styles from './App.module.css';
import Api from '../../utils/api';
import { IngredientsContext } from '../../services/ingredientsContext';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [orderId, setOrderId] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const closeModal = () => {
    setSelectedIngredient({})
    setOrderId(0);
  }

  const showErrorMessage = (error: SetStateAction<string>) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage('');
    }, 3000);
  }

  const sendOrderHandler = (ingredients: Array<string>) => {
    Api.sendOrder(ingredients)
      .then(res => res.success && setOrderId(res.order.number))
      .catch(error => {
        console.log(`SEND_ORDER_ERROR: ${error}`);
        showErrorMessage('Ошибка при отправке заказа.');
      });
  }

  const openIngredientInfoModal = (ingredient: SetStateAction<object>) => {
    setSelectedIngredient(ingredient);
  }

  useEffect(() => {
    Api.getIngredients()
      .then(res => {
        setIngredients(res.data);
      })
      .catch(error => {
        console.log(`GET_INGREDIENTS_ERROR: ${error}`);
        showErrorMessage('Ошибка при получении данных.');
      });
      // eslint-disable-next-line
  }, [])
  
  return (
    <>
      <AppHeader/>
      {ingredients.length !== 0 &&
        <div className={styles.appWrapper}>
          <BurgerIngredients ingredients={ingredients} openModal={openIngredientInfoModal}/>
          <IngredientsContext.Provider value={ingredients}>
            <BurgerConstructor sendOrder={sendOrderHandler}/>
          </IngredientsContext.Provider>
        </div>
      }
      
      {orderId !== 0 && 
        <Modal closeModal={closeModal}>
          <OrderDetails orderId={orderId}/>
        </Modal>
      }

      {Object.keys(selectedIngredient).length !== 0 && 
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={selectedIngredient}/>
        </Modal>
      }

      {errorMessage && <ErrorMessage errorMessage={errorMessage}/>}
    </>
  );
}

export default App;
