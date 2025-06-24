import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import './style.css';

export default function BasketItem() {
  return (
    <div className='basket-item'>
      <img
        src='https://img.freepik.com/free-photo/pizza-pizza-filled-with-tomatoes-salami-olives_140725-1200.jpg?uid=R28494730&ga=GA1.1.492278078.1744949520&semt=ais_hybrid&w=740'
        alt='Pizza'
        className='basket-item-image'
      />
      <div className='basket-item-info'>
        <div className='item-header'>
          <h5 className='item-title m-0'>Margaritta pizza</h5>
          <h6 className='item-price m-0'>12 000 so'm</h6>
        </div>
        <p className='item-description m-0'>
          This is a very long product description that should be cut off after two lines with an
          ellipsis if it exceeds the limit.
        </p>
        <div className='basket-item-config'>
          <button className='quantity-btn decrease' aria-label='Decrease quantity'>
            <MinusOutlined />
          </button>
          <span className='quantity-display'>12</span>
          <button className='quantity-btn increase' aria-label='Increase quantity'>
            <PlusOutlined />
          </button>
        </div>
      </div>
    </div>
  );
}
