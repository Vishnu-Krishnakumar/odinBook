import { useEffect, useState } from "react";

import { socket } from "../sockets/socket";
import { friendList } from "../serverUtils/server";
function Friends({userId, isOwnProfile}){

  const [friends,setFriends] = useState([]);

  useEffect(()=>{
    
    async function setList(){
      // console.log(list);
      // setFriends(list);
      let list = await friendList(userId);
      console.log(list);
      setFriends(list);
    }
    setList();
    // socket.on(`friendList-${userId}`,setList);

    // return ()=>{
    //   socket.off(`friendList-${userId}`,setList);
    // }

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