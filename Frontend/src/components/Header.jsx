import React, { useRef } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    const ct_code = useRef(jwtDecode(localStorage.getItem('access')))
    console.log(ct_code);
    const logout = () =>{
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/')
    }
    return (
        <header class='flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
            <div class='flex flex-wrap items-center justify-between gap-5 w-full'>
                <p className='text-2xl'><span className='font-bold'>CTP</span>aste</p>

                <div class='flex max-lg:ml-auto space-x-3'>
                    <button
                        class='px-2 py-2 text-sm rounded-full font-bold'>CT Code: {ct_code.current?.ct_code}</button>

                    <button
                    onClick={()=>logout()}
                        class='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>New Session</button>
                </div>
            </div>
        </header>
    )
}

export default Header