import { useEffect, useState } from "react";
import { socket } from "../sockets/socket"
import { friendRequests } from "../serverUtils/server";
function FriendRequest({userId, isOwnProfile}){
  const [newRequests, setRequests] = useState([]);
  console.log(userId);

  async function friendAccept(e){
    e.preventDefault();
    console.log(e.target.id);
    socket.emit(`acceptFriend`,{user:userId,friend:parseInt(e.target.id)});
    await request();
  }

  async function friendDecline(e){
    e.preventDefault();
    console.log(e.target.id);
    socket.emit(`declineFriend`,{user:userId,friend:parseInt(e.target.id)});
    await request();
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
       {
          newRequests.map((request,index)=>{
            return(
              <div key = {index}>

                <a href={`https://odinbookbackend-ay2f.onrender.com/user/profile/` + request.senderId}>{request.sender.firstname + " " + request.sender.lastname}</a>
                <button id = {request.senderId} onClick={friendAccept}>Accept</button>
                <button id = {request.senderId} onClick={friendDecline}>Decline</button>
              </div>
            )
          })
       }
      </div>
    )
  }
  
  export default FriendRequest;