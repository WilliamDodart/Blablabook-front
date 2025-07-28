import { toast } from 'react-toastify';

function successToast(message: string) {
  toast.success(message);
}

function errorToast(message: string) {
  toast.error(message);
}

function infoToast(message: string) {
  toast.info(message);
}

export { successToast, errorToast, infoToast };
