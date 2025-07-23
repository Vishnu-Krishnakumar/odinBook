import { useEffect, useState } from "react";
import { socket } from "../sockets/socket"
function FriendRequest({userId}){
  const [newRequests, setRequests] = useState([]);

  function friendAccept(e){
    e.preventDefault();
    console.log(e.target.id);
    socket.emit(`acceptFriend`,{user:userId,friend:parseInt(e.target.id)});
  }
  function friendDecline(e){
    e.preventDefault();
    console.log(e.target.id);
    socket.emit(`declineFriend`,{user:userId,friend:parseInt(e.target.id)});
  }
    useEffect(()=>{
    
        function onRequest(request){
          console.log("request Test" + request);
          setRequests(request);
          console.log("new request" + newRequests);
        }
    
        socket.on(`request-${userId}`,onRequest);
    
        return ()=>{
          socket.off(`request-${userId}`,onRequest);
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
                <button id = {request.senderId} onClick={friendDecline}>Decline</button>
              </li>
            )
          })
       }
       </ul>
      </div>
    )
  }
  
  export default FriendRequest;