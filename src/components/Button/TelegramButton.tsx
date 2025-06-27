import { Image } from 'antd';

const TelegramButton = ({
  username = 'your_channel',
  text = "Telegram orqali bog'lanish",
  className = '',
}) => {
  const handleTelegramClick = () => {
    const telegramAppUrl = `tg://resolve?domain=${username}`;
    const telegramWebUrl = `https://t.me/${username}`;

    // Function to detect if we're on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    );

    if (isMobile) {
      // Try to open Telegram app first
      const startTime = Date.now();

      // Create a hidden iframe to try opening the app
      const iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      iframe.src = telegramAppUrl;
      document.body.appendChild(iframe);

      // Set a timeout to check if app opened
      setTimeout(() => {
        const endTime = Date.now();
        // If less than 2 seconds passed, likely app didn't open
        if (endTime - startTime < 2000) {
          // App likely not installed, open web version
          window.open(telegramWebUrl, '_blank');
        }
        // Clean up
        document.body.removeChild(iframe);
      }, 1500);
    } else {
      // On desktop, try app link first, then fallback to web
      window.location.href = telegramAppUrl;

      // Fallback to web after short delay
      setTimeout(() => {
        window.open(telegramWebUrl, '_blank');
      }, 1000);
    }
  };

  return (
    <button onClick={handleTelegramClick} className='help-button w-100'>
      <Image className='help-button-img' src={require('@/assets/icons/telegram.svg')} />
      {text}
    </button>
  );
};

export default TelegramButton;
