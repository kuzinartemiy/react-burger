import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import styles from './App.module.css';

import { useDispatch, useSelector } from '../../services/hooks';
import { getIngredients, getUser } from '../../services/actions';
import { AppHeader } from '../AppHeader/AppHeader';
import { LoginPage } from '../../pages/LoginPage/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage/RegisterPage';
import { ForgotPasswordPage } from '../../pages/ForgotPasswordPage/ForgotPasswordPage';
import { ResetPasswordPage } from '../../pages/ResetPasswordPage/ResetPasswordPage';
import { ProfilePage } from '../../pages/ProfilePage/ProfilePage';
import { HomePage } from '../../pages/HomePage/HomePage';
import { Page404 } from '../../pages/404Page/404Page';
import { IngredientDetails } from '../IngredientDetails/IngredientDetails';
import { Modal } from '../Modal/Modal';
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';
import { ErrorMessage } from '../ErrorMessage/ErrorMessage';

function App() {
  const dispatch = useDispatch();
  const location = useLocation<any>();

  const background = location.state && location.state.background;
  const errorMessage = useSelector((store) => store.errorMessage);

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(getUser());
  }, [dispatch]);

  return (
    <>
      <AppHeader />
      {errorMessage && <ErrorMessage />}
      <Switch location={background || location}>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/ingredients/:id">
          <div className={styles.app__ingredientDetailsWrapper}>
            <IngredientDetails />
          </div>
        </Route>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/reset-password" component={ResetPasswordPage} />
        <ProtectedRoute exact path="/profile" component={ProfilePage} />
        <ProtectedRoute exact path="/profile/orders" component={ProfilePage} />
        <Route component={Page404} />
      </Switch>
      {background
        && (
        <Route exact path="/ingredients/:id">
          <Modal>
            <IngredientDetails />
          </Modal>
        </Route>
        )}
    </>
  );
}

export default App;
