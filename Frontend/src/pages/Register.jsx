import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Register() {
    const [Session, setSession] = useState(true)
    const [Code, setCode] = useState('')
    const [DeviceName, setDeviceName] = useState('')
    const navigate = useNavigate()
    const generate_code = async() => {
        await axios.get('http://localhost:8000/v1/generates/code/').then((res)=>{
            console.log('hello');
            setCode(res.data.CT_code)
        }).catch((err)=>{
            console.log(err);
        })
    }
    const validate = () => {
        const newErrors = {};
        if (Code.trim() === '') {
            newErrors.Code = 'Code cannot be empty';
        } else if (Code.length !== 4) {
            newErrors.Code = 'Code must be exactly 4 characters long';
        }

        if (DeviceName.trim().length < 3) {
            newErrors.DeviceName = 'Device name must be at least 3 characters long';
        }

        return newErrors;
    };


    const CreateRoom = async() =>{
        const FormData = {'ct_code':Code, 'device_name':DeviceName}
        await axios.post('http://localhost:8000/v1/rooms/join/', FormData).then((res)=>{
            RedirectHome(res.data)
        }).catch((err)=>{
            alert('')
            console.log(err);
        })
    }
    const JoinRoom = async() =>{
        const FormData = {'ct_code':Code, 'device_name':DeviceName}
        await axios.post('http://localhost:8000/v1/rooms/create/', FormData).then((res)=>{
            RedirectHome(res.data)
        }).catch((err)=>{
            console.log(err);
        })
    }
    const RedirectHome = (data) =>{
        localStorage.setItem('access', data.access)
        localStorage.setItem('refresh', data.refresh)
        navigate('/home')
    }
    return (
        <div className='w-screen bg-cyan-50 h-screen'>
            <div className='absolute top-1/3 lg:top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2'>

                <div className='border-2 rounded-xl border-gray-500 w-80 sm:w-96 h-72'>
                    <div className='text-center font-mono text-xl font-bold tracking-wide'>
                        CTPaste
                    </div>
                    <form className='text-center mt-7 text-gray-900 max-w-md mx-auto pl-6 pr-6'>
                        <div className="relative h-11 w-full min-w-[200px] mb-6">
                            <input placeholder="Device Name" value={DeviceName} onChange={(e)=>setDeviceName(e.target.value)}
                                className="peer border-gray-700 h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                            <label
                                className="after:content[''] pointer-events-none absolute left-0  -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:after:scale-x-100 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                Device Name
                            </label>
                        </div>
                        <div className="relative h-10 w-full min-w-[200px]">
                            <input placeholder="CTP Code" value={Code} onChange={(e)=>{Session && setCode(e.target.value)}} type='number'
                                className="peer border-gray-700 h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 valid:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100" />
                            <label
                                className="before:content[' '] after:content[' ']  pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-valid:text-[11px] peer-valid:leading-tight peer-valid:text-gray-900 peer-valid:before:border-t-2 peer-valid:before:border-l-2 peer-valid:before:!border-gray-900 peer-valid:after:border-t-2 peer-valid:after:border-r-2 peer-valid:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                CTP Code
                            </label>
                            {!Session ?
                                <div className='absolute top-2 right-2 cursor-pointer' onClick={()=>{generate_code()}}>
                                    <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none" >
                                        <path d="M11 2L13 3.99545L12.9408 4.05474M13 18.0001L11 19.9108L11.0297 19.9417M12.9408 4.05474L11 6M12.9408 4.05474C12.6323 4.01859 12.3183 4 12 4C7.58172 4 4 7.58172 4 12C4 14.5264 5.17107 16.7793 7 18.2454M17 5.75463C18.8289 7.22075 20 9.47362 20 12C20 16.4183 16.4183 20 12 20C11.6716 20 11.3477 19.9802 11.0297 19.9417M13 22.0001L11.0297 19.9417" stroke="#000000" strokeWidth="2" stroke-linecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                :
                                <div className='absolute top-2 right-2 cursor-pointer' onClick={()=>setCode('')}>
                                    <svg width="23px" height="23px" viewBox="0 0 24 24" fill="none">
                                        <path d="M6.99486 7.00636C6.60433 7.39689 6.60433 8.03005 6.99486 8.42058L10.58 12.0057L6.99486 15.5909C6.60433 15.9814 6.60433 16.6146 6.99486 17.0051C7.38538 17.3956 8.01855 17.3956 8.40907 17.0051L11.9942 13.4199L15.5794 17.0051C15.9699 17.3956 16.6031 17.3956 16.9936 17.0051C17.3841 16.6146 17.3841 15.9814 16.9936 15.5909L13.4084 12.0057L16.9936 8.42059C17.3841 8.03007 17.3841 7.3969 16.9936 7.00638C16.603 6.61585 15.9699 6.61585 15.5794 7.00638L11.9942 10.5915L8.40907 7.00636C8.01855 6.61584 7.38538 6.61584 6.99486 7.00636Z" fill="#0F0F0F" />
                                    </svg>
                                </div>
                            }
                        </div>

                        <div className="flex gap-2 pt-5">
                            <p className="text-gray-600 text-sm">{Session ? "Need a new room/code" : "You already have a code"}</p>
                            <p className="text-blue-400 text-sm underline cursor-pointer" onClick={async() => {setSession((res) => !res); {Session? generate_code(): setCode('')}}}>{Session ? "Create" : 'Join In'}</p>
                        </div>
                        <button onClick={()=>{Session? CreateRoom(): JoinRoom()}} type='button' className="mt-5 bg-transparent relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-400 to-blue-400 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200">
                            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-cyan-50 rounded-md group-hover:bg-opacity-0">
                                Get in
                            </span>
                        </button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register