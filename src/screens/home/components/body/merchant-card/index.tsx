import { CloseCircleOutlined, StarFilled } from '@ant-design/icons';

export default function MerchantCard({ merchant }: { merchant: any }) {
  return (
    <div className='p-16'>
      <div
        style={{
          width: '100%',
          height: 160,
          // borderRadius: 22,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#eee',
          borderStyle: 'solid',
          backgroundImage: `url(${merchant.image})`,
        }}
      >
        <div className='delivery-time'>
          <h6 className='m-0'>12-24 daq</h6>
        </div>
        <div className='free-delivery'>
          <div className='free-delivery-icon'>
            <img
              src={require('@/assets/icons/home-body-header-menu/delivery.svg')}
              alt='delivery'
              style={{ width: '14px' }}
            />
          </div>
          <h6 className='m-0'>Tekin yetkazib berish</h6>
        </div>
        <div className='closed'>
          <div className='d-flex j-center a-center f-column'>
            <CloseCircleOutlined className='closed-icon' />
            <h4 className='m-0'>Hozirgi vaqtda yopiq</h4>
          </div>
        </div>
      </div>
      <div>
        <div className='mt-8 d-flex j-between a-center'>
          <h3 className='m-0'>
            {merchant.businessName}
          </h3>
          <div className='menu-item-rating d-flex'>
            <StarFilled className='menu-item-rating-icon' />
            <h4 className='m-0'>4.4</h4>
          </div>
        </div>
        <div>
          <div className='menu-item-subtitle d-flex mt-4'>
            <small>Magazin</small>
            <i className='bi bi-dot'></i>
            <small>Kantselariya</small>
          </div>
        </div>
      </div>
    </div>
  );
}
