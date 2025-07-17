import { useState, useEffect } from 'react';
import './App.css';
import Main from './components/Main';
import { Outlet } from "react-router-dom";
import { socket } from './sockets/socket';

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userId, setUserId] = useState(1);
  useEffect(() => {
    function onConnect() {
      console.log('Socket connected!');
      setIsConnected(true);
    }

    function onDisconnect() {
      console.log('Socket disconnected!');
      setIsConnected(false);
    }
    
    function onRequest(request){
      console.log(request)
    }
 
    socket.on('connection', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on(`request-${userId}`, onRequest);

    return () => {
      socket.off('connection', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('request', onRequest);
    };
  }, []);

  return (
    <div>
     <Outlet />
    </div>
  )
}

export default App
