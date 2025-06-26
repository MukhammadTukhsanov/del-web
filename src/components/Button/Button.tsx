import { Button as AntdButton } from 'antd';

interface ButtonProps {
  onClick: () => void;
  style?: React.CSSProperties | undefined;
  title: string;
}

const Button = ({ onClick, style, title }: ButtonProps) => {
  return (
    <AntdButton
      style={{
        backgroundColor: '#ff9556',
        height: '44px',
        paddingRight: '36px',
        paddingLeft: '36px',
        fontSize: '16px',
        ...style,
      }}
      type='primary'
      onClick={onClick}
    >
      {title}
    </AntdButton>
  );
};

export default Button;
