// Import the required libraries
import { toast, Bounce } from 'react-toastify';


const useToast = () => {
    const options = {
        position: "bottom-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
    }
    // Success toast
    const toastSuccess = (message) => {
      toast.success(message, options);
    };
  
    // Error toast
    const toastError = (message) => {
      toast.error(message, options);
    };
  
    // Info toast
    const toastInfo = (message) => {
      toast.info(message, options);
    };
  
    // Warning toast
    const toastWarning = (message) => {
      toast.warn(message, options);
    };
  
    // General toast
    const toastPlain = (message) => {
      toast(message, options);
    };
  
    return {
      toastSuccess,
      toastError,
      toastInfo,
      toastWarning,
      toastPlain
    };
  };
  
  export default useToast;