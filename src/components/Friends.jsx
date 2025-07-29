import { useEffect, useState } from "react";

import { socket } from "../sockets/socket";
function Friends({userId, isOwnProfile}){

  const [friends,setFriends] = useState([]);
  
  useEffect(()=>{
    function setList(list){
      console.log(list);
      setFriends(list);
    }

    socket.on(`friendList-${userId}`,setList);

    return ()=>{
      socket.off(`friendList-${userId}`,setList);
    }

  },[userId])

  return(
    <div className ="friends">
     <h2>Friends</h2>
     <ul>
       {
         friends.map((friend,index)=>{
          return(
            <li key = {index} id = {friend.id}>{friend.firstname + " " + friend.lastname}</li>
          )
         })
       }
     </ul>
    </div>
  )
}

export default Friends;