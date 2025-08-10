import { faker } from '@faker-js/faker';
import { userList } from '../serverUtils/server';
import { useEffect, useState } from 'react';
import { socket } from "../sockets/socket"
import { useAuth } from '../context/authContext';
function UsersIndex(){
  const [users,setUsers] = useState([]);
  const { loggedUser,loading,logout } = useAuth();  
  function friendRequest(e){
    e.preventDefault();
    console.log(e.target)
    console.log(loggedUser)
    socket.emit(`sendRequest`,{sender:loggedUser.user.id,receiver:e.target.id});
  }

  useEffect(()=>{
    async function userListRetrieval(){
      const list = await userList();
      setUsers(list);
    }
    userListRetrieval();
  },[])

  return (
    <div>
      {users.map((user)=>{
        return (
          <div id = {user.id} key ={user.id} className = "randomUser">
            <img className="profileAvatar" src={user.profilepic}></img>
            <span>{user.firstname + " " + user.lastname}</span>
            <button id = {user.id} onClick={friendRequest}>Friend Request!</button>
          </div>
        )
        
      })}
    </div>
  )
}

export default UsersIndex;