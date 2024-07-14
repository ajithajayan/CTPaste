import React from 'react'
import { toast } from 'react-toastify';

export const TextCopyToastify = () => {
    return toast.success('Copied 📎', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
        
}

