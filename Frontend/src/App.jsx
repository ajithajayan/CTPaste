import { useState } from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css'
import Register from './pages/Register';
import Home from './pages/Home';
import Header from './components/Header';

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route index={true} element={<Register/>} />
      <Route path="home" element={<>
        <Header/>
        <Home/>
        </>
        } />
    </Routes>
  </BrowserRouter>

  )
}

export default App
