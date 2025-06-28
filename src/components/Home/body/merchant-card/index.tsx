import { MarketTypes } from '@/constants/MarketType';
import { CloseCircleOutlined, StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './merchant-card.css';

export default function MerchantCard({ merchant }: { merchant: any }) {
  const navigate = useNavigate();
  return (
    <div
      className='p-16'
      onClick={() => {
        console.log('merchant: ', merchant);
        return navigate(`/market/${merchant.id}`, {
          state: merchant,
        });
      }}
    >
      <div className='merchant-card-header' style={{ backgroundImage: `url(${merchant.photo})` }}>
        <div className='delivery-time'>
          <h6 className='m-0'>{merchant.deliveryTime}</h6>
        </div>
        <div className='delivery-price-wrapper'>
          <div className='delivery-price-wrapper-icon'>
            <img
              src={require('@/assets/icons/home-body-header-menu/delivery.svg')}
              alt='delivery'
              style={{ width: '14px' }}
            />
          </div>
          <h6 className='m-0'>
            {merchant.deliveryPrice
              ? 'Yetkazib berish ' +
                new Intl.NumberFormat('uz-UZ').format(merchant.deliveryPrice) +
                " so'm"
              : 'Tekin yetkazib berish'}
          </h6>
        </div>
        {!merchant.isOpen && (
          <div className='closed-wrapper'>
            <div className='d-flex j-center a-center f-column'>
              <CloseCircleOutlined className='closed-icon' />
              <h4 className='m-0'>Hozirgi vaqtda yopiq</h4>
            </div>
          </div>
        )}
      </div>
      <div>
        <div className='mt-8 d-flex j-between a-center merchant-name'>
          <h3 className='m-0'>{merchant.businessName}</h3>
          <div className='merchant-rating d-flex'>
            <StarFilled className='merchant-rating-icon' />
            <h4 className='m-0'>{merchant.rate ? merchant.rate : 'Yangi'}</h4>
          </div>
        </div>
        <div>
          <div className='merchant-subtitle d-flex mt-4'>
            <small>{merchant.isMerchant ? 'Magazin' : 'Restoran'}</small>
            <i className='bi bi-dot'></i>
            <small>{MarketTypes.find((item) => item.id === merchant.merchentType)?.text}</small>
          </div>
        </div>
      </div>
    </div>
  );
}
