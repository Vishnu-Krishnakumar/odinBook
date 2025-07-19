import { useEffect, useState } from "react";
import { socket } from "../sockets/socket"
function FriendRequest(){
  const [newRequests, setRequests] = useState([]);

  function friendAccept(e){
    e.preventDefault();
    console.log(e.target.id);
    socket.emit(`acceptFriend`,{user:1,friend:e.target.id});
  }

    useEffect(()=>{
    
        function onRequest(request){
          console.log(request)
          setRequests(request);
        }
    
        socket.on(`request-${2}`,onRequest);
    
        return ()=>{
          socket.off(`request-${2}`,onRequest);
        }
      },[])

    return(
      <div className ="friendRequests">
       <h2>Friend Requests</h2>
       <ul>
       {
          newRequests.map((request,index)=>{
            return(
              <li key = {index}> 
                {request.senderId}
                <button id = {request.senderId} onClick={friendAccept}>Accept</button>
                <button>Decline</button>
              </li>
            )
          })
       }
       </ul>
      </div>
    )
  }
  
  export default FriendRequest;