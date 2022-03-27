import {
  Button, EmailInput, Input, PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { SyntheticEvent, useEffect, useState } from 'react';
import { getUser, updateUser } from '../../services/actions';
import { useDispatch, useSelector } from '../../services/hooks';
import styles from './EditProfileForm.module.css';

export const EditProfileForm = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { user } = useSelector((store) => ({
    user: store.user,
  }));

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const updateUserHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    const newUserData = {
      email, name, password,
    };
    dispatch(updateUser(newUserData));
  };

  const resetFormHandler = (evt: SyntheticEvent) => {
    evt.preventDefault();
    dispatch(getUser());
  };

  return (
    <form onReset={resetFormHandler} onSubmit={updateUserHandler} className={styles.editProfileForm}>
      <fieldset className={styles.editProfileForm__fieldset}>
        <Input placeholder="Имя" onChange={(e) => setName(e.target.value)} value={name} />
        <EmailInput name="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <PasswordInput name="Password" onChange={(e) => setPassword(e.target.value)} value={password} />
        <Button htmlType="submit" type="primary">Сохранить</Button>
        <Button htmlType="reset" type="secondary">Отмена</Button>
      </fieldset>
    </form>
  );
};
