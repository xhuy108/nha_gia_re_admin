import { toast } from 'react-toastify';
export const successNoti = (text) => {
  toast.success(`${text || 'Default Message'}`, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};

export const errorNoti = (text) => {
  toast.error(`${text || 'Default Message'}`, {
    position: 'top-center',
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });
};
