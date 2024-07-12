import React, { useEffect, useRef, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate()
    const [CT_code, setCT_code] = useState({})
    const logout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        navigate('/')
    }

    useEffect(() => {
        setCT_code(jwtDecode(localStorage.getItem('access')))
    }, [])
    return (
        <header className='flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50'>
            <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
                <p className='text-2xl'><span className='font-bold'>CTP</span>aste</p>

                <div className='flex max-lg:ml-auto space-x-3'>
                    <button
                        className='px-2 py-2 text-sm rounded-full font-bold'>CT Code: {CT_code?.ct_code}</button>

                    <button
                        onClick={() => logout()}
                        className='px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]'>New Session</button>
                </div>
            </div>
        </header>
    )
}

export default Header