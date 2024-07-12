import React from 'react'

const Home = () => {
    return (
        <div className='md:pr-11 md:pl-11 pl-5 pr-5'>
            <div className="flex flex-col h-screen">

                <div className="flex justify-center items-center h-16 pt-8">
                    <input type="text" className="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4" placeholder="Type a message..." />
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
                </div>
                <div className="flex-grow overflow-y-auto">
                    <div className="flex flex-col mb-4 gap-4 py-4">

                        {/* Receiver */}
                        <div>
                            <label className='text-sm font-mono font-extrabold'>helo</label>
                            <div className="flex justify-start">
                                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                                    <p className="text-gray-900 text-sm">Hey, how are you?</p>
                                </div>
                            </div>
                        </div>

                        {/* Sender */}
                        <div className='text-right '>
                            <label className='text-sm font-mono font-extrabold'>Laptop</label>
                            <div className="flex justify-end">
                                <div className="bg-blue-500 rounded-lg px-4 py-2 max-w-[70%] text-left">
                                    <p className="text-white text-sm">I'm good, thanks! How about you?</p>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home