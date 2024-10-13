import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type IType = 'error' | 'success' | 'info' | 'warning';

export const notify = (message: string, type: IType = 'error') => {
  toast[type](message, {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
}
