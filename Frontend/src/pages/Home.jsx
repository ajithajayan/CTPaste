import React from 'react'

const Home = () => {
    return (
        <div className='pr-11 pl-11'>
            <div class="flex flex-col h-screen">
                <div class="flex-grow overflow-y-auto">
                    <div class="flex flex-col mb-4 gap-4 py-4">

                        {/* Receiver */}
                        <div>
                            <label className='text-sm font-mono font-extrabold'>helo</label>
                            <div class="flex justify-start">
                                <div class="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                                    <p class="text-gray-900 text-sm">Hey, how are you?</p>
                                </div>
                            </div>
                        </div>

                        {/* Sender */}
                        <div className='text-right '>
                            <label className='text-sm font-mono font-extrabold'>Laptop</label>
                            <div class="flex justify-end">
                                <div class="bg-blue-500 rounded-lg px-4 py-2 max-w-[80%] text-left">
                                    <p class="text-white text-sm">I'm good, thanks! klasfdfff fffkkkkk kkkkkkkkkkk kkkkkkkkkkkkkkk kkkkkkfff ffffffffffffffffff How about you?</p>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex justify-start">
                            <div class="bg-gray-100 rounded-lg px-4 py-2 max-w-[80%]">
                                <p class="text-gray-900 text-sm">I'm doing great, thanks for asking!</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex justify-center items-center h-16">
                    <input type="text" class="border border-gray-300 rounded-lg py-2 px-4 w-full max-w-lg mr-4" placeholder="Type a message..." />
                    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Send</button>
                </div>
            </div>
        </div>
    )
}

export default Home