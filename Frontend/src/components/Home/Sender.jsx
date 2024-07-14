import React from 'react'
import { FaCopy } from 'react-icons/fa';
import { TextCopyToastify } from './Toastify';

const Sender = ({ res }) => {
    const dateTime = new Date(res.created_time);
    const time = dateTime.toLocaleTimeString([], {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });
    function copyToClipboard() {
        TextCopyToastify()
        navigator.clipboard.writeText(res.message)
        // navigator.clipboard.writeText('text').then(() => console.log('Copied!'));
        };

    return (
        <div className='text-right '>
            {/* Sender */}
            <label className='text-sm font-mono font-extrabold'>{res.device}</label>
            <div className="flex justify-end">
                <div className='bg-blue-500 rounded-l-lg content-center'>
                    <div className='cursor-pointer ml-2' onClick={() => copyToClipboard(copyToClipboard)}>
                        <FaCopy />
                        {/* <svg className='bg-yellow' width="18" height="22" viewBox="3 0 13 15" id="copy"><path className='text-green-500' fill="#212121" d="M4.00029246,4.08524952 L4,10.5 C4,11.8254834 5.03153594,12.9100387 6.33562431,12.9946823 L6.5,13 L10.9143985,13.000703 C10.7082819,13.5829319 10.1528467,14 9.5,14 L6,14 C4.34314575,14 3,12.6568542 3,11 L3,5.5 C3,4.84678131 3.41754351,4.29108512 4.00029246,4.08524952 Z M11.5,2 C12.3284271,2 13,2.67157288 13,3.5 L13,10.5 C13,11.3284271 12.3284271,12 11.5,12 L6.5,12 C5.67157288,12 5,11.3284271 5,10.5 L5,3.5 C5,2.67157288 5.67157288,2 6.5,2 L11.5,2 Z"></path></svg> */}
                    </div>
                </div>

                <div className="bg-blue-500 rounded-lg rounded-l-none px-4 py-2 max-w-[70%] text-left">
                    <p className="text-white text-sm">{res.message}</p>
                </div>
            </div>
            <label className='text-xs'>{time}</label>
        </div>
    )
}

export default Sender