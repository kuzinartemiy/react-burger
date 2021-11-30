import './App.css';
import { AppHeader } from './components/AppHeader/AppHeader';
import { BurgerConstructor } from './components/BurgerConstructor/BurgerConstructor';
import { BurgerIngredients } from './components/BurgerIngredients/BurgerIngredients';
import data from './utils/data';

function App() {
  return (
    <>
      <AppHeader/>
      <div className="App-wrapper">
        <BurgerIngredients ingredients={data}/>
        <BurgerConstructor ingredients={data}/>
      </div>
      
    </>
  );
}

export default App;
