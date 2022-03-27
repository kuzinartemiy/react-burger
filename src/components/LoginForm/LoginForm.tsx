import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../services/actions';
import { useDispatch } from '../../services/hooks';
import styles from './LoginForm.module.css';

export const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (evt:ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt:ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleSubmitLoginForm = (evt: FormEvent) => {
    evt.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <form onSubmit={handleSubmitLoginForm} className={styles.loginForm}>
      <h1 className={`text text_type_main-medium ${styles.loginForm__header}`}>Вход</h1>
      <div className="p-3" />
      <Input type="email" placeholder="Email" name="email" value={email} onChange={handleChangeEmail} />
      <div className="p-3" />
      <PasswordInput name="password" value={password} onChange={handleChangePassword} />
      <div className="p-3" />
      <Button type="primary" size="medium">
        Войти
      </Button>
      <div className="p-10" />
      <div className={styles.loginForm__caption}>
        <p className="text text_type_main-default text_color_inactive">Вы — новый пользователь?</p>
        <Link className={`text text_type_main-default ${styles.loginForm__link}`} to="/register">Зарегистрироваться</Link>
      </div>
      <div className="p-2" />
      <div className={styles.loginForm__caption}>
        <p className="text text_type_main-default text_color_inactive">Забыли пароль?</p>
        <Link className={`text text_type_main-default ${styles.loginForm__link}`} to="/forgot-password">Восстановить пароль</Link>
      </div>
    </form>
  );
};
