import { Redirect, useLocation } from 'react-router-dom';
import { LoginForm } from '../../components/LoginForm/LoginForm';
import { useSelector } from '../../services/hooks';

export const LoginPage = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const location = useLocation<any>();

  if (isAuth) {
    const { from } = location.state || { from: { pathname: '/' } };

    return (
      <Redirect to={from} />
    );
  }

  return (
    <LoginForm />
  );
};
