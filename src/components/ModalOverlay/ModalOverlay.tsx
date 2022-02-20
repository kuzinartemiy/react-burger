import styles from './ModalOverlay.module.css';
import { IModalOverlayProps } from './ModalOverlay.props';

export const ModalOverlay = ({ closeModal }: IModalOverlayProps): JSX.Element => {
  return <div onClick={closeModal} className={`${styles.modalOverlay}`}/>
}