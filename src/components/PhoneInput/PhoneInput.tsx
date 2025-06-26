import '@/components/Input/Input.css';
import { PhoneOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import {
  cleanPhoneNumber,
  formatPhoneNumber,
  validateUzbekPhoneNumber,
} from '../phoneInputUtilities/phoneInputUtilities';

interface PhoneInputProps {
  value?: string;
  onChange?: (value: string, cleanValue: string) => void;
  onValidChange?: (cleanValue: string, isValid: boolean) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  size?: 'small' | 'middle' | 'large';
  autoFocus?: boolean;
}

const PhoneInput: React.FC<PhoneInputProps> = ({
  value = '',
  onChange,
  onValidChange,
  placeholder = 'Telefon raqam',
  disabled = false,
  className = '',
  error = false,
  size = 'large',
  autoFocus = false,
}) => {
  const [displayValue, setDisplayValue] = useState(value || '+998 ');
  const [isValid, setIsValid] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<any>(null);
  const cursorPositionRef = useRef<number>(0);

  // Initialize with +998 if empty
  useEffect(() => {
    if (!value) {
      setDisplayValue('+998 ');
    } else {
      const formatted = formatPhoneNumber(value);
      setDisplayValue(formatted);
      const cleaned = cleanPhoneNumber(formatted);
      setIsValid(validateUzbekPhoneNumber(formatted));
    }
  }, [value]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    const cursorPosition = e.target.selectionStart || 0;

    // Don't allow deletion of +998
    if (inputValue.length < 4 || !inputValue.startsWith('+998')) {
      setDisplayValue('+998 ');
      setTimeout(() => {
        if (inputRef.current?.input) {
          inputRef.current.input.setSelectionRange(5, 5);
        }
      }, 0);
      return;
    }

    const formatted = formatPhoneNumber(inputValue);
    const cleaned = cleanPhoneNumber(formatted);
    const valid = validateUzbekPhoneNumber(formatted);

    setDisplayValue(formatted);
    setIsValid(valid);

    // Store cursor position for later restoration
    cursorPositionRef.current = cursorPosition;

    // Call callbacks
    onChange?.(formatted, cleaned);
    onValidChange?.(cleaned, valid);

    // Restore cursor position after formatting
    setTimeout(() => {
      if (inputRef.current?.input) {
        const newCursorPos = calculateNewCursorPosition(e.target.value, formatted, cursorPosition);
        inputRef.current.input.setSelectionRange(newCursorPos, newCursorPos);
      }
    }, 0);
  };

  const calculateNewCursorPosition = (
    oldValue: string,
    newValue: string,
    oldCursor: number,
  ): number => {
    // If cursor was at the end, keep it at the end
    if (oldCursor >= oldValue.length) {
      return newValue.length;
    }

    // Count digits before cursor in old value
    const digitsBeforeCursor = oldValue.substring(0, oldCursor).replace(/\D/g, '').length;

    // Find position in new value that has same number of digits
    let digitCount = 0;
    for (let i = 0; i < newValue.length; i++) {
      if (/\d/.test(newValue[i])) {
        digitCount++;
        if (digitCount === digitsBeforeCursor) {
          return i + 1;
        }
      }
    }

    return newValue.length;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const cursorPosition = (e.target as HTMLInputElement).selectionStart || 0;

    // Prevent deletion of +998 prefix
    if ((e.key === 'Backspace' || e.key === 'Delete') && cursorPosition <= 5) {
      e.preventDefault();
      return;
    }

    // Only allow digits and navigation keys
    const allowedKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'Tab',
      'Enter',
    ];

    if (!allowedKeys.includes(e.key) && !/\d/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);

    // Position cursor after +998 if at beginning
    setTimeout(() => {
      if (e.target.selectionStart === 0) {
        e.target.setSelectionRange(5, 5);
      }
    }, 0);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    const digitsOnly = pastedText.replace(/\D/g, '');

    if (digitsOnly) {
      const formatted = formatPhoneNumber(digitsOnly);
      setDisplayValue(formatted);

      const cleaned = cleanPhoneNumber(formatted);
      const valid = validateUzbekPhoneNumber(formatted);
      setIsValid(valid);

      onChange?.(formatted, cleaned);
      onValidChange?.(cleaned, valid);
    }
  };

  const getInputClassName = () => {
    let className = 'phone-input';

    if (error) className += ' phone-input-error';
    if (isValid && displayValue.length > 5) className += ' phone-input-valid';
    if (isFocused) className += ' phone-input-focused';

    return className;
  };

  return (
    <div className='phone-input-wrapper'>
      <Input
        ref={inputRef}
        size={size}
        value={displayValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onPaste={handlePaste}
        prefix={
          <PhoneOutlined
            style={{
              color: isFocused ? '#ff9556' : '#8c8c8c',
              transition: 'color 0.3s ease',
            }}
          />
        }
        placeholder={placeholder}
        disabled={disabled}
        className={`${getInputClassName()} ${className}`}
        autoFocus={autoFocus}
        inputMode='tel'
        autoComplete='tel'
        maxLength={19} // +998 (XX) XXX-XX-XX
        style={{
          fontSize: size === 'large' ? '16px' : '14px',
          fontWeight: 500,
          letterSpacing: '0.5px',
        }}
      />

      {/* Validation indicator */}
      {displayValue.length > 5 && (
        <div className={`phone-validation-indicator ${isValid ? 'valid' : 'invalid'}`}>
          {isValid ? (
            <span className='validation-icon'>✓</span>
          ) : (
            <span className='validation-icon'>✗</span>
          )}
        </div>
      )}

      <style jsx>{`
        .phone-input-wrapper {
          position: relative;
          width: 100%;
        }

        .phone-input {
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .phone-input:focus,
        .phone-input-focused {
          border-color: #ff9556 !important;
          box-shadow: 0 0 0 2px rgba(255, 149, 86, 0.2) !important;
          transform: translateY(-1px);
        }

        /* .phone-input-valid {
          border-color: #52c41a !important;
          box-shadow: 0 0 0 2px rgba(82, 196, 26, 0.2) !important;
        } */

        .phone-input-error {
          border-color: #ff4d4f !important;
          box-shadow: 0 0 0 2px rgba(255, 77, 79, 0.2) !important;
          animation: shake 0.5s ease-in-out;
        }

        .phone-validation-indicator {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          animation: fadeIn 0.3s ease-out;
        }

        .validation-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          font-size: 12px;
          font-weight: bold;
          color: white;
          transition: all 0.3s ease;
        }

        .valid .validation-icon {
          background-color: #52c41a;
          animation: bounce 0.5s ease-out;
        }

        .invalid .validation-icon {
          background-color: #ff4d4f;
          animation: pulse 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(-50%) scale(1);
          }
        }

        @keyframes bounce {
          0%,
          20%,
          60%,
          100% {
            transform: translateY(-50%) scale(1);
          }
          40% {
            transform: translateY(-50%) scale(1.1);
          }
          80% {
            transform: translateY(-50%) scale(1.05);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            transform: translateY(-50%) scale(1);
          }
          50% {
            transform: translateY(-50%) scale(1.05);
          }
        }

        @keyframes shake {
          0%,
          100% {
            transform: translateX(0);
          }
          10%,
          30%,
          50%,
          70%,
          90% {
            transform: translateX(-3px);
          }
          20%,
          40%,
          60%,
          80% {
            transform: translateX(3px);
          }
        }
      `}</style>
    </div>
  );
};

export default PhoneInput;
