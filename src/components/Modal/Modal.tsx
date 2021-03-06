import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useHistory } from 'react-router-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { IModalProps } from './Modal.props';

export const Modal = ({ children, extCloseModal }: IModalProps) => {
  const rootModal: HTMLElement | null = document.getElementById('root-modal');
  const history = useHistory();

  const closeModal = () => {
    extCloseModal ? extCloseModal() : history.goBack();
  };

  useEffect(() => {
    const closeModalByEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && closeModal();
    };

    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    };
  }, []);

  return rootModal && createPortal(
    <div className={styles.modal__wrapper}>
      <div className={styles.modal}>
        <button type="button" className={styles.modal__closeBtn} onClick={closeModal} />
        {children}
      </div>
      <ModalOverlay closeModal={closeModal} />
    </div>,
    rootModal,
  );
};
