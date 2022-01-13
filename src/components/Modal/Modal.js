import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export const Modal = ({closeModal, children}) => {
  const rootModal = document.getElementById('root-modal');

  useEffect(() => {
    const closeModalByEsc = (e) => {
      e.key === 'Escape' && closeModal();
    }

    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    }
  }, [closeModal])

  return createPortal(
    <div className={styles.modal__wrapper}>
      <div className={styles.modal}>
        <button className={styles.modal__closeBtn} onClick={closeModal}/>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal}/>
    </div>
  , rootModal)
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}