import { Input, PasswordInput, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { registerUser } from '../../services/actions/user';
import { useDispatch } from '../../services/hooks';
import styles from './RegisterForm.module.css';

export const RegisterForm = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleChangeEmail = (evt:ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt:ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };

  const handleChangeName = (evt:ChangeEvent<HTMLInputElement>) => {
    setName(evt.target.value);
  };

  const handleRegisterUser = (evt:FormEvent) => {
    evt.preventDefault();

    dispatch(registerUser(email, password, name));
  };

  return (
    <form onSubmit={handleRegisterUser} className={styles.registerForm}>
      <h1 className={`text text_type_main-medium ${styles.registerForm__header}`}>Регистрация</h1>
      <div className="p-3" />
      <Input type="text" placeholder="Имя" name="name" value={name} onChange={handleChangeName} />
      <div className="p-3" />
      <Input type="email" placeholder="Email" name="email" value={email} onChange={handleChangeEmail} />
      <div className="p-3" />
      <PasswordInput name="password" value={password} onChange={handleChangePassword} />
      <div className="p-3" />
      <Button type="primary" size="medium">
        Зарегистрироваться
      </Button>
      <div className="p-10" />
      <div className={styles.registerForm__caption}>
        <p className="text text_type_main-default text_color_inactive">Уже зарегистрированы?</p>
        <Link className={`text text_type_main-default ${styles.registerForm__link}`} to="/login">Войти</Link>
      </div>
    </form>
  );
};
