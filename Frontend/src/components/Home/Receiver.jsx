import React, { useRef } from 'react'
import { FaCopy } from "react-icons/fa";
import { TextCopyToastify } from './Toastify';


const Receiver = ({ res }) => {
    const dateTime = new Date(res.created_time);
    const time = dateTime.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
console.log(res.created_time, res.message);
console.log(dateTime, res.message);
console.log(time, res.message);

    function copyToClipboard() {
        TextCopyToastify()
        navigator.clipboard.writeText(res.message)
    };
      return (
        <div>
            <div>
                <label className='text-sm font-mono font-extrabold'>{res.device}</label>
            </div>
            <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%] rounded-r-none">
                    <p className="text-gray-900 text-sm">{res.message}</p>
                </div>
                <div className='bg-gray-100 rounded-r-lg content-center'>
                    <div className='cursor-pointer mr-2' onClick={() => copyToClipboard(copyToClipboard)}>
                        <FaCopy/>
                    </div>
                </div>
            </div>
            <label className='text-xs'>{time}</label>
        </div>
    )
}

export default Receiver