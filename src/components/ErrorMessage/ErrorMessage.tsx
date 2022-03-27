import { useEffect, useState } from 'react';
import { useSelector } from '../../services/hooks';
import styles from './ErrorMessage.module.css';

export const ErrorMessage = () => {
  const errorMessage = useSelector((store) => store.errorMessage);
  const [errorMessageClassName, setErrorMessageClassName] = useState(styles.errorMessage);

  useEffect(() => {
    errorMessage && setErrorMessageClassName(`${styles.errorMessage} ${errorMessage && styles.errorMessage_show}`);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={errorMessageClassName}>
      <p className="text text_type_main-default">{errorMessage}</p>
    </div>
  );
};
