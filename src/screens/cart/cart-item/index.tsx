import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './style.css';

export default function CartItem({
  category,
  count,
  id,
  image,
  name,
  price,
}: {
  category: string;
  count: number;
  id: string;
  image: string;
  name: string;
  price: string;
}) {
  return (
    <div className='cart-item'>
      <img src={image} alt='Pizza' className='cart-item-image' />
      <div className='cart-item-info'>
        <div className='item-header'>
          <h5 className='item-title m-0'>{name}</h5>
          <h6 className='item-price m-0'>{price}</h6>
        </div>
        {/* <p className='item-description m-0'>
          This is a very long product description that should be cut off after two lines with an
          ellipsis if it exceeds the limit.
        </p> */}
        <div className='cart-item-config'>
          <button className='quantity-btn decrease' aria-label='Decrease quantity'>
            <MinusOutlined />
          </button>
          <span className='quantity-display'>{count}</span>
          <button className='quantity-btn increase' aria-label='Increase quantity'>
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
