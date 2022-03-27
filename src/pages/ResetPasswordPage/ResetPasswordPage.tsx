import { useHistory } from 'react-router-dom';
import { ResetPasswordForm } from '../../components/ResetPasswordForm/ResetPasswordForm';
import { useSelector } from '../../services/hooks';

export const ResetPasswordPage = () => {
  const isAuth = useSelector((store) => store.isAuth);
  const history = useHistory();

  if (isAuth) {
    history.goBack();
  }

  return (
    <ResetPasswordForm />
  );
};
