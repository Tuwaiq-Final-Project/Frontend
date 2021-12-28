import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function successNotify(message,autoCloseMillisecond = 2000){
    toast.success(message, {
        position: "top-center",
        autoClose: autoCloseMillisecond,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}
function errorNotify(message){
    toast.error(message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
}
export default {successNotify, errorNotify}
