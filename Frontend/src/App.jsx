import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';
import HomePrivateRouter from './components/utils/HomeprivateRouter';
import LoginPrivateRouter from './components/utils/LoginPrivateRouter';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route index={true} element={<LoginPrivateRouter><Register/></LoginPrivateRouter>} />
      <Route path="home" element={<HomePrivateRouter>
        <Header/>
        <Home/>
        </HomePrivateRouter>
        } />
    </Routes>
  </BrowserRouter>

  )
}

export default App
