import { Button as AntdButton } from 'antd';

interface ButtonProps {
  onClick: () => void;
  style?: React.CSSProperties | undefined;
  title: string;
  className?: string;
  disabled?: boolean;
}

const Button = ({ onClick, style, title, className, disabled }: ButtonProps) => {
  return (
    <AntdButton
      style={{
        backgroundColor: '#ff9556',
        height: '44px',
        paddingRight: '36px',
        paddingLeft: '36px',
        fontSize: '16px',
        color: disabled ? '#ffffff80' : '#fff',
        ...style,
      }}
      type='primary'
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {title}
    </AntdButton>
  );
};

export default Button;
