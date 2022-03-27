import styles from './ModalOverlay.module.css';
import { IModalOverlayProps } from './ModalOverlay.props';

export const ModalOverlay = ({ closeModal }: IModalOverlayProps) => <div role="none" onClick={closeModal} className={`${styles.modalOverlay}`} />;
