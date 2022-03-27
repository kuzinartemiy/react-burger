import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';
import { IModalProps } from './Modal.props';

export const Modal = ({ closeModal, children }: IModalProps): JSX.Element | null => {
  const rootModal: HTMLElement | null = document.getElementById('root-modal');

  useEffect(() => {
    const closeModalByEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && closeModal();
    }

    document.addEventListener('keydown', closeModalByEsc);

    return () => {
      document.removeEventListener('keydown', closeModalByEsc);
    }
  }, [closeModal])

  return rootModal && createPortal(
    <div className={styles.modal__wrapper}>
      <div className={styles.modal}>
        <button className={styles.modal__closeBtn} onClick={closeModal}/>
        {children}
      </div>
      <ModalOverlay closeModal={closeModal}/>
    </div>
  , rootModal)
}