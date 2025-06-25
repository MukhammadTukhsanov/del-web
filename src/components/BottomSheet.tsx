import React, { useEffect, useRef, useState } from 'react';
import './BottomSheet.css';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  height?: string | number;
  children: React.ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, title, height, children }) => {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [dynamicHeight, setDynamicHeight] = useState<string>('auto');

  // Calculate dynamic height based on content
  useEffect(() => {
    if (isOpen && contentRef.current && !height) {
      const contentHeight = contentRef.current.scrollHeight;
      const headerHeight = title ? 76 : 24; // Handle + header or just handle
      const totalHeight = contentHeight + headerHeight;
      const maxHeight = window.innerHeight * 0.9; // 90vh

      if (totalHeight > maxHeight) {
        setDynamicHeight('90vh');
      } else {
        setDynamicHeight(`${totalHeight}px`);
      }
    }
  }, [isOpen, children, title, height]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTranslateY(0);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.touches[0].clientY);
    setCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const touchY = e.touches[0].clientY;
    const deltaY = touchY - startY;

    if (deltaY > 0) {
      setCurrentY(touchY);
      setTranslateY(deltaY);
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const deltaY = currentY - startY;

    if (deltaY > 100) {
      onClose();
    } else {
      setTranslateY(0);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const isHandleArea =
      target.closest('.bottom-sheet-handle-container') || target.closest('.bottom-sheet-header');

    if (!isHandleArea) return;

    setIsDragging(true);
    setStartY(e.clientY);
    setCurrentY(e.clientY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaY = e.clientY - startY;

    if (deltaY > 0) {
      setCurrentY(e.clientY);
      setTranslateY(deltaY);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    setIsDragging(false);
    const deltaY = currentY - startY;

    if (deltaY > 100) {
      onClose();
    } else {
      setTranslateY(0);
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, startY, currentY]);

  if (!isOpen) return null;

  const sheetHeight = height
    ? typeof height === 'number'
      ? `${height}px`
      : height
    : dynamicHeight;

  return (
    <>
      <div className='bottom-sheet-backdrop' onClick={onClose} />
      <div
        ref={sheetRef}
        className={`bottom-sheet ${isOpen ? 'bottom-sheet-open' : ''}`}
        style={{
          //   height: sheetHeight,
          transform: `translateY(${translateY}px)`,
          transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className='bottom-sheet-handle-container' onMouseDown={handleMouseDown}>
          <div className='bottom-sheet-handle' />
        </div>

        {/* {title && (
          <div className='bottom-sheet-header'>
            <h3 className='bottom-sheet-title'>{title}</h3>
            <Button
              type='text'
              shape='circle'
              icon={<CloseOutlined />}
              onClick={onClose}
              className='bottom-sheet-close-btn'
            />
          </div>
        )} */}

        <div className='bottom-sheet-content' ref={contentRef}>
          {children}
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
