import React from "react";
import styles from "../styles/Input.module.scss";

const Input = ({ label, value, onChange, type = "text", ...props }) => (
  <div className={styles.inputContainer}>
    <label className={styles.label}>{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      className={styles.input}
      {...props}
    />
  </div>
);

export default Input;
