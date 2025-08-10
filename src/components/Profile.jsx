import { faker } from '@faker-js/faker';
import { useState,useEffect } from 'react';
import Intro from './Intro'
import Posts from './Posts';
import Friends from './Friends';
import Users from './Users';
import { Link,useLocation, useParams  } from 'react-router-dom';
import Search from './Search';
import UsersIndex from './UsersIndex';
import { socket } from '../sockets/socket';
import FriendRequest from './FriendRequests';
import { retrieveUser } from '../serverUtils/server';
import { useAuth } from '../context/authContext';
import { useNavigate,useNavigation  } from "react-router-dom";
function Profile({route}){
  const { loggedUser,loading,logout } = useAuth();  
  const navigate = useNavigate();
  const [serverConnection, serverIsConnected] = useState(socket.connected);
  const [newUser,setUser] = useState({});
  const params = useParams();
  const profileUserId = parseInt(params.userId);
  const loggedId = loggedUser?.user.id
  

  
  if(!loggedUser){
    return <div>Not Logged in!!!</div>
  }

  if (loading) {
    return <div>Loading...</div>; 
  }


  const isOwnProfile = !loading && loggedUser && loggedUser.user.id === profileUserId;
  
  function createRandomUser() {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.username(), 
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  }


  
  function onClickTest(e){
    e.preventDefault();
   
    logout();
    navigate('/signin')
  }

  useEffect( () => {
 
    function onConnect() {
      serverIsConnected(true);
    }

    function onDisconnect() {
      serverIsConnected(false);
    }
    async function userRetrieval(){
      let foundUser = await retrieveUser(params.userId)
      setUser(foundUser);
    }
    userRetrieval();

 
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
  

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);

    };
  }, []);
  
  if(newUser === null){
    return <div>There is no such user!</div>
  }

  return (
    <div >
      <div>
        <Link to="usersIndex">User Index</Link>
        <Search></Search>
        <span>Welcome user {loggedUser?.user.id}</span>
        <button onClick={onClickTest}>Log Out</button>
      </div>
      <div>
        <header>
          <Users></Users>
        </header>
      </div>
      <div className='mainProfile'>
        <div className ="userProfile">
          <div>
            <div>
              <Intro user ={newUser} isOwnProfile = {isOwnProfile} ></Intro>
            </div>
            <div>
              <FriendRequest userId = {loggedUser.user.id}  isOwnProfile = {isOwnProfile}></FriendRequest>
            </div>
            <div>
              <Friends userId = {params.userId} isOwnProfile = {isOwnProfile}></Friends>
            </div>
            
        </div>
      </div>
            
      <div>
          <Link to ="postsIndex">Recent Posts</Link>
          <Posts userId ={params.userId} isOwnProfile = {isOwnProfile} ></Posts>
        </div>
    </div>
      </div>
      
    
  )
}

export default Profile