import { ReactNode } from 'react';
import styles from './Input.module.css';

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: ReactNode;
  placeholder?: string;
};

const Input = ({ value, onChange, prefix, placeholder }: InputProps) => {
  return (
    <div className={styles.wrapper}>
      {prefix && <span className={styles.prefix}>{prefix}</span>}
      <input className={styles.input} value={value} onChange={onChange} placeholder={placeholder} />
    </div>
  );
};

export default Input;
