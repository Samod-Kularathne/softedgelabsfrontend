import React from 'react';
import styles from '../styles/Button.module.scss';

const Button = ({ onClick, children, type = 'button', ...props }) => (
  <button type={type} onClick={onClick} className={styles.button} {...props}>
    {children}
  </button>
);

export default Button;
