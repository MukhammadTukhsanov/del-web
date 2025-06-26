import { Input as AntdInput } from 'antd';
import { cloneElement, isValidElement, ReactNode } from 'react';

type InputProps = {
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
};

const Input = ({ type = 'text', value, onChange, prefix, placeholder, inputMode }: InputProps) => {
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
      value={value}
      inputMode={inputMode}
      onChange={onChange}
      style={{ height: '44px', fontSize: '16px' }}
      prefix={styledPrefix}
      placeholder={placeholder}
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
