import Button from '@/components/Button/Button';
import Input from '@/components/Input/Input';
import { updateCurrentUser } from '@/features/auth/userSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useState } from 'react';
import './profile-modal.css';

interface UserEditModalProps {
  show: boolean;
  hide: () => void;
}

const UserEditModal = ({ show, hide }: UserEditModalProps) => {
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user.user);
  const [userName, setUserName] = useState(user?.name || '');

  const handleEditProfile = async () => {
    try {
      await dispatch(updateCurrentUser({ name: userName }));
      hide();
    } catch {
      console.log('error');
    }
  };

  return (
    show && (
      <div className='modal-overlay' onClick={hide}>
        <div className='modal-content' onClick={(e) => e.stopPropagation()}>
          <div className='modal-header'>
            <h3 className='modal-title'>
              Tahrirlash
            </h3>
            <button className='close-button' onClick={hide}>
              <i className='bi bi-x'></i>
            </button>
          </div>
          <div className='modal-body'>
            <div className='d-flex px-16 f-column gap-16'>
              <Input
                value={`+${formatUzbekPhone(user.phone)}`}
                onChange={() => null}
                disabled
                placeholder={user.phone}
              />
              <Input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder='Ism va Familiya'
              />
              <Button title='Yangilash' onClick={handleEditProfile} />
            </div>
          </div>
        </div>
      </div>
    )
  );

  function formatUzbekPhone(phone: string) {
    if (!phone || phone.length !== 12) return phone;
    return `${phone.slice(0, 3)} ${phone.slice(3, 5)} ${phone.slice(5, 8)} ${phone.slice(
      8,
      10,
    )} ${phone.slice(10, 12)}`;
  }
};

export default UserEditModal;
