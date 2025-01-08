import React from 'react';
import styles from '../styles/Modal.module.scss';
import Button from './Button';

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <div className={styles.content}>{children}</div>
        <Button onClick={onClose}>Close</Button>
      </div>
    </div>
  );
};

export default Modal;
