import { ReactNode } from 'react';

function Modal({
  title,
  hide,
  children,
  show,
}: {
  title: string;
  hide: () => void;
  children: ReactNode;
  show: boolean;
}) {
  return (
    <>
      {show && (
        <div className='modal-overlay' onClick={hide}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header'>
              <h3 className='modal-title'>{title}</h3>
              <button className='close-button' onClick={hide}>
                <i className='bi bi-x'></i>
              </button>
            </div>
            <div className='modal-body'>{children}</div>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
