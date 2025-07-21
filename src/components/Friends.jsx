import { useEffect, useState } from "react";

import { socket } from "../sockets/socket";
function Friends(){

  const [friends,setFriends] = useState([]);
  
  useEffect(()=>{
    function setList(list){
      console.log(list);
      setFriends(list);
    }

    socket.on(`friendList-${2}`,setList);

    return ()=>{
      socket.off(`friendList-${2}`,setList);
    }
  })

  return(
    <div className ="friends">
     <h2>Friends</h2>
     <ul>
       {
         friends.map((friend,index)=>{
          return(
            <li key = {index}>{friend.friendId}</li>
          )
         })
       }
     </ul>
    </div>
  )
}

export default Friends;