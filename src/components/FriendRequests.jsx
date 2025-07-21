import { useEffect, useState } from "react";
import { socket } from "../sockets/socket"
function FriendRequest(){
  const [newRequests, setRequests] = useState([]);

  function friendAccept(e){
    e.preventDefault();
    console.log(e.target.id);
    socket.emit(`acceptFriend`,{user:1,friend:parseInt(e.target.id)});
  }
  function friendDecline(e){
    e.preventDefault();
    console.log(e.target.id);
    socket.emit(`declineFriend`,{user:1,friend:parseInt(e.target.id)});
  }
    useEffect(()=>{
    
        function onRequest(request){
          console.log(request)
          if(request[0] === null) setRequests([])
          else
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
          newRequests[0] === null ? newRequests.map((request,index)=>{
            return(
              <li key = {index}> 
                {request.senderId}
                <button id = {request.senderId} onClick={friendAccept}>Accept</button>
                <button id = {request.senderId} onClick={friendDecline}>Decline</button>
              </li>
            )
          }):null
       }
       </ul>
      </div>
    )
  }
  
  export default FriendRequest;