import { Input as AntdInput } from 'antd';
import { cloneElement, isValidElement, ReactNode } from 'react';
import './Input.css';

type InputProps = {
  disabled?: boolean;
  type?: 'password' | 'text';
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  prefix?: ReactNode;
  placeholder?: string;
  inputMode?:
    | 'search'
    | 'none'
    | 'text'
    | 'tel'
    | 'url'
    | 'email'
    | 'numeric'
    | 'decimal'
    | undefined;
  className?: string | undefined;
  onPressEnter?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
};

const Input = ({
  disabled,
  type = 'text',
  value,
  onChange,
  prefix,
  placeholder,
  inputMode,
  className,
  onPressEnter,
}: InputProps) => {
  const styledPrefix =
    prefix && isValidElement(prefix)
      ? cloneElement(prefix as React.ReactElement<any>, {
          style: {
            color: '#3c486b',
            fontSize: '16px',
            opacity: 0.7,
            ...((prefix as any).props?.style || {}),
          },
        })
      : prefix;

  return type === 'text' ? (
    <AntdInput
      className={`${className} yolda-input`}
      value={value}
      inputMode={inputMode}
      onChange={onChange}
      style={{ height: '44px', fontSize: '14px' }}
      prefix={styledPrefix}
      placeholder={placeholder}
      disabled={disabled}
      onPressEnter={onPressEnter}
    />
  ) : (
    <AntdInput.Password
      value={value}
      inputMode={inputMode}
      onChange={onChange}
      style={{ height: '44px', fontSize: '16px' }}
      prefix={styledPrefix}
      placeholder={placeholder}
    />
  );
};

export default Input;
