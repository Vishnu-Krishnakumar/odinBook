import { useNavigate,useNavigation  } from "react-router-dom";

import { useState,useEffect } from "react";
import { socket } from '../sockets/socket';
function SignIn(){
  const navigate = useNavigate();
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [userId, setUserId] = useState(2);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
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

  function formSubmit(e){
    e.preventDefault();
    console.log("This probably isnt working right now");
    const formData = new FormData(e.target);
    console.log(formData.get("userName"));
    console.log(formData.get("password"));
    navigate('/profile', {
      state: {
        userId: userId,
        isConnected: isConnected,
      },
    });
  }
  return(
    <div>
      <form onSubmit={formSubmit}>
        <label htmlFor ="userName">User Name:</label>
        <input type ="text" id = "userName" name = "userName"></input>
        <label htmlFor = "password">Password:</label>
        <input type ="password" id ="password" name = "password"></input>
        <input type = "submit" value = "Submit"></input>
      </form>
    </div>
  )

}

export default SignIn