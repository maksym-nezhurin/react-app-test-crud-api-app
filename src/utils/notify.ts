import { toast } from 'react-toastify';
import { toast as sooner } from "sonner"
import 'react-toastify/dist/ReactToastify.css';
import {capitalizeFirstLetter} from "./strings.ts";

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

export const soonerNotify = (message: string, type: IType = 'error') => {
  sooner[type](message, {
    description: capitalizeFirstLetter(type)
  })
}