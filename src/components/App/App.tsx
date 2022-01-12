import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

import { SetStateAction, useEffect, useState } from 'react';
import styles from './App.module.css';
import Api from '../../utils/api';
import { IngredientsContext } from '../../contexts/ingredientsContext';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderInfoModalVisible, setOrderInfoModalOpen] = useState(false);
  const [isIngredientInfoModalOpen, setIngredientInfoModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});
  const [orderId, setOrderId] = useState(0);

  const closeModal = () => {
    setOrderInfoModalOpen(false);
    setIngredientInfoModalOpen(false);
  }

  const sendOrderHandler = (ingredients: Array<string>) => {
    Api.sendOrder(ingredients)
      .then(res => {
        if(res.success) setOrderId(res.order.number);
        setOrderInfoModalOpen(true);
      })
      .catch(error => console.log(`SEND_ORDER_ERROR: ${error}`));
  }

  const openIngredientInfoModal = (ingredient: SetStateAction<object>) => {
    setSelectedIngredient(ingredient);
    setIngredientInfoModalOpen(true);
  }

  useEffect(() => {
    Api.getIngredients()
      .then(res => {
        setIngredients(res.data);
      })
      .catch(error => console.log(`GET_INGREDIENTS_ERROR: ${error}`));
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
      
      {isOrderInfoModalVisible && 
        <Modal closeModal={closeModal}>
          <OrderDetails orderId={orderId}/>
        </Modal>
      }

      {isIngredientInfoModalOpen && 
        <Modal closeModal={closeModal}>
          <IngredientDetails ingredient={selectedIngredient}/>
        </Modal>
      }
    </>
  );
}

export default App;
