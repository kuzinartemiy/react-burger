import { useEffect, useState } from 'react';
import styles from './ErrorMessage.module.css';

export const ErrorMessage = ({ errorMessage }) => {
  const [errorMessageClassName, setErrorMessageClassName] = useState(styles.errorMessage);

  useEffect(() => {
    errorMessage && setErrorMessageClassName(`${styles.errorMessage} ${errorMessage && styles.errorMessage_show}`);
    // eslint-disable-next-line
  }, []);

  return (
    <div className={errorMessageClassName}>
      <p className='text text_type_main-default'>{errorMessage}</p>
    </div>
  )
}