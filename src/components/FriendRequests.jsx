import { useEffect, useState } from "react";
import { socket } from "../sockets/socket"
import { friendRequests } from "../serverUtils/server";
function FriendRequest({userId, isOwnProfile}){
  const [newRequests, setRequests] = useState([]);
  console.log(userId);

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

  async function request(){
    console.log("requesting");
    let requests = await friendRequests();
    console.log(requests);
    setRequests(requests);
  }
  
    useEffect(()=>{
    
        function onRequest(request){
          console.log("request Test" + request);
          setRequests(request);
          console.log("new request" + newRequests);
        }
       
        socket.on(`sentRequest-${userId}`,onRequest);
        socket.emit(`request-${userId}`,{id:userId});
        
        // if (socket.connected) {
        //   request();
        // } else {
        //   socket.once("connect", () => {
        //     console.log("Socket connected, requesting...");
        //     request();
        //   });
        // }

        request();

        return ()=>{
          socket.off(`sentRequest-${userId}`,onRequest);
        }
      },[])

    return(
      <div className ="friendRequests">
       <h2 onClick={request}>Friend Requests</h2>
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