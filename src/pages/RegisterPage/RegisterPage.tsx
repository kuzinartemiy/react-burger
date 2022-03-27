import { useHistory } from 'react-router-dom';
import { RegisterForm } from '../../components/RegisterForm/RegisterForm';
import { useSelector } from '../../services/hooks';

export const RegisterPage = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const history = useHistory();

  if (isAuth) {
    history.goBack();
  }

  return (
    <RegisterForm />
  );
};
