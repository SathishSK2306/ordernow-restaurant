// utils/toast.js
import { toast } from 'react-toastify';

const defaultToastConfig = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored', // or 'light', 'dark'
};

/**
 * Displays a toast notification with the given message and type.
 * @param {string} message - The message to display in the toast.
 * @param {'success' | 'error' | 'info' | 'warning'} type - The type of toast notification.
 * @param {Object} [overrideOptions={}] - Options specific to this toast call, overriding defaults.
 */ 

export function showToast(message, type = 'info', overrideOptions = {}) {
  if (!message || String(message).trim() === '') {
    console.warn('Toast message is empty or invalid. No toast will be shown.');
    return;
  }

  // Specific options provided by the caller will override the defaults
  const options = {
    ...defaultToastConfig,
    ...overrideOptions,
  };

  switch (type) {
    case 'success':
      toast.success(message, options);
      break;
    case 'error':
      toast.error(message, options);
      break;
    case 'info':
      toast.info(message, options);
      break;
    case 'warning':
      toast.warn(message, options);
      break;
    default:
      console.warn(`Unknown toast type: ${type}. Defaulting to info.`);
      toast.info(message, options);
  }
}