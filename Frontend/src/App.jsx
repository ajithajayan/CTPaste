import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Home/Header';
import HomePrivateRouter from './components/utils/HomeprivateRouter';
import LoginPrivateRouter from './components/utils/LoginPrivateRouter';
import { Bounce, ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        />
      <Routes>
        <Route index={true} element={<LoginPrivateRouter><Register /></LoginPrivateRouter>} />
        <Route path="home" element={<HomePrivateRouter>
          <Header />
          <Home />
        </HomePrivateRouter>
        } />
      </Routes>
    </BrowserRouter>

  )
}

export default App
