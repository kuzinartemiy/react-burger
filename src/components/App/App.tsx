import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { Modal } from '../Modal/Modal';
import { OrderDetails } from '../OrderDetails/OrderDetails';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';

import { SetStateAction, useEffect, useState } from 'react';
import styles from './App.module.css';
import Api from '../../utils/api';

function App() {
  const [ingredients, setIngredients] = useState([]);
  const [isOrderInfoModalVisible, setOrderInfoModalOpen] = useState(false);
  const [isIngredientInfoModalOpen, setIngredientInfoModalOpen] = useState(false);
  const [selectedIngredient, setSelectedIngredient] = useState({});

  const closeModal = () => {
    setOrderInfoModalOpen(false);
    setIngredientInfoModalOpen(false);
  }

  const openAcceptedOrderInfoModal = () => {
    setOrderInfoModalOpen(true);
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
  }, [])
  
  return (
    <>
      <AppHeader/>
      {ingredients.length !== 0 &&
        <div className={styles.appWrapper}>
          <BurgerIngredients ingredients={ingredients} openModal={openIngredientInfoModal}/>
          <BurgerConstructor ingredients={ingredients} openModal={openAcceptedOrderInfoModal}/>
        </div>
      }
      <div id="root-modal"/>

      {isOrderInfoModalVisible && 
        <Modal closeModal={closeModal}>
          <OrderDetails/>
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
