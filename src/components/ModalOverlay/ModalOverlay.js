import styles from './ModalOverlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ closeModal }) => {
  return (
    <div onClick={closeModal} className={`${styles.modalOverlay}`}/>
  )
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
}