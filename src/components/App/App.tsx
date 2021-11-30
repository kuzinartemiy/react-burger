import { AppHeader } from '../AppHeader/AppHeader';
import { BurgerConstructor } from '../BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from '../BurgerIngredients/BurgerIngredients';
import { data } from '../../utils/data';
import styles from './App.module.css';

function App() {
  return (
    <>
      <AppHeader/>
      <div className={styles.appWrapper}>
        <BurgerIngredients ingredients={data}/>
        <BurgerConstructor ingredients={data}/>
      </div>
      
    </>
  );
}

export default App;
