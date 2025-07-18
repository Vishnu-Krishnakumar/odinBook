import { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import { Outlet } from "react-router-dom";


function App() {

 

  return (
    <div>
     <Outlet />
    </div>
  )
}

export default App
