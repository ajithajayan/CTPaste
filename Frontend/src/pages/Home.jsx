import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import useWebSocket, { ReadyState } from 'react-use-websocket';
import Sender from '../components/Home/Sender';
import Receiver from '../components/Home/Receiver';
import { toast } from 'react-toastify';

const socketUrl = "ws://localhost:8000/ws/chat/"

const Home = () => {
    const [Text, setText] = useState('')
    const [messageHistory, setMessageHistory] = useState([]);
    const [AccessToken, setAccessToken] = useState({})
    const { sendMessage, lastMessage, readyState } = useWebSocket(
        AccessToken ? `${socketUrl}${AccessToken.ct_code}` : null,
        {
            onOpen: () => console.log('WebSocket connection opened'),
            onClose: () => {
                console.log('WebSocket connection closed')
                setMessageHistory([])
            },
        }
    );

    useEffect(() => {
        if (lastMessage?.data) {
            setMessageHistory((prev) => [JSON.parse(lastMessage.data)].concat(prev));
        }
    }, [lastMessage]);

    useEffect(() => {
        if (localStorage.getItem('access'))
            setAccessToken(jwtDecode(localStorage.getItem('access')))
    }, [])
    const submitMessage = () => {
        sendMessage(JSON.stringify({ "device": AccessToken.device_name, "message": Text }))
        setText('')
    }
    return (
        <div className='md:pr-11 md:pl-11 pl-5 pr-5'>
            <div className="flex flex-col h-screen">

                <div className="flex justify-center items-center h-16 pt-8">
                    <input value={Text} type="text" onChange={(res) => setText(res.target.value)} className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4" placeholder="Type a message..." />
                    <button onClick={() => submitMessage()} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
                </div>
                <div className="flex-grow overflow-y-none">
                    <div className="flex flex-col mb-4 gap-4 py-4">
                        {messageHistory.map((res, index) =>
                        (res.user_id == AccessToken.user_id ? (
                            <Receiver res={res} key={index}/>
                        ) : (
                            <Sender res={res} key={index}/>
                        )
                        )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home