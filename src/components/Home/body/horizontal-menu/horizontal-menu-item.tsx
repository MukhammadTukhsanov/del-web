import { StarFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export default function HorizontalMenuItem() {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate('/market')}>
      <div
        style={{
          width: 240,
          height: 120,
          borderRadius: 22,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
          backgroundImage: `url('https://img.freepik.com/free-photo/composition-stationery-tools-school-education_23-2148200049.jpg?t=st=1750692856~exp=1750696456~hmac=09c6724a09a8b2b24d886f77bf075c4718f98d6fd3cfc7e38d2a23847637a307&w=996')`,
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
        {/* <div className='closed'>
          <div className='d-flex j-center a-center f-column'>
            <CloseCircleOutlined className='closed-icon' />
            <h4 className='m-0'>Hozirgi vaqtda yopiq</h4>
          </div>
        </div> */}
      </div>
      <div>
        <div className='mt-8 d-flex j-between a-center'>
          <h3 className='m-0'>Skripka</h3>
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
