import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function ToastMsg(message, msgType) {
  return msgType === "success"
    ? toast.success(`${message}`, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
 
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      })
    : toast.error(`${message}`, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
}
