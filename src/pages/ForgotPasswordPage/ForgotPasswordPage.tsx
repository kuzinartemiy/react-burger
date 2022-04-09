import { useHistory } from 'react-router-dom';
import { ForgotPasswordForm } from '../../components/ForgotPasswordForm/ForgotPasswordForm';
import { useSelector } from '../../services/hooks';

export const ForgotPasswordPage = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const history = useHistory();

  if (isAuth) {
    history.goBack();
  }

  return (
    <ForgotPasswordForm />
  );
};
