import { toast } from 'react-toastify';

export const notify = () => toast('Wow so easy!');

export const toastNotificationSuccess = message => {
  toast.success(message);
};

export const toastNotificationError = message => {
  toast.error(message);
};
