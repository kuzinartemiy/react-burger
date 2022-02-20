import { useEffect, useState } from 'react';
import styles from './ErrorMessage.module.css';
import { IErrorMessageProps } from './ErrorMessage.props';

export const ErrorMessage = ({ errorMessage }: IErrorMessageProps): JSX.Element => {
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