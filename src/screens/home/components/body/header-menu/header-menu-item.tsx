import './style.css';

export default function HeaderMenuItem({ src, title }: { src: string; title: string }) {
  return (
    <div className={'header-menu-item'}>
      <div className='circle'>
        <img src={src} alt={title} style={{ width: '100%' }} />
      </div>
      <h6>{title}</h6>
    </div>
  );
}
