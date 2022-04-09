import { Button, Input } from '@ya.praktikum/react-developer-burger-ui-components';
import {
  ChangeEvent, SyntheticEvent, useCallback, useState,
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { resetPassword } from '../../services/actions/user';
import { useDispatch } from '../../services/hooks';
import styles from './ForgotPasswordForm.module.css';

export const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [email, setEmail] = useState<string>('');
  const [isFormValid, setFormValid] = useState<boolean>(false);

  const handleChangeEmail = (evt:ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handleChangeForm = (evt:ChangeEvent<HTMLFormElement>) => {
    const isValid = evt.target.checkValidity();
    setFormValid(isValid);
  };

  const handlePasswordReset = useCallback(
    (event: SyntheticEvent) => {
      event.preventDefault();
      dispatch(resetPassword(email));
      setEmail('');
      setFormValid(false);
      history.push('/reset-password');
    },
    [dispatch, email, history],
  );

  return (
    <form onChange={handleChangeForm} className={styles.forgotPasswordForm}>
      <h1 className={`text text_type_main-medium ${styles.forgotPasswordForm__header}`}>Восстановление пароля</h1>
      <div className="p-3" />
      <Input type="email" placeholder="Укажите e-mail" name="email" value={email} onChange={handleChangeEmail} />
      <div className="p-3" />
      <Button disabled={!isFormValid} onClick={handlePasswordReset} type="primary" size="medium">
        Восстановить
      </Button>
      <div className="p-10" />
      <div className={styles.forgotPasswordForm__caption}>
        <p className="text text_type_main-default text_color_inactive">Вспомнили пароль?</p>
        <Link className={`text text_type_main-default ${styles.forgotPasswordForm__link}`} to="/login">Войти</Link>
      </div>
    </form>
  );
};
