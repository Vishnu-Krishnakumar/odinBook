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
function Profile({route}){
  const location = useLocation();
  const { userId } = location.state || '';
  const [serverConnection, serverIsConnected] = useState(socket.connected);
  const [newUser,setUser] = useState({});
  const params = useParams();
  function createRandomUser() {
    return {
      userId: faker.string.uuid(),
      username: faker.internet.username(), // before version 9.1.0, use userName()
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    };
  }

  const user = createRandomUser();
  
  function onClickTest(e){
    e.preventDefault();
    let user = {
      sender:7,
      receiver:1,
    }
    console.log(user);
    socket.emit("sendRequest",user);
  }

  useEffect( () => {
    console.log(userId);
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
    let found = userRetrieval();
    console.log(newUser);
    // function onRequest(request){
    //   console.log(request)
    // }
 
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    // socket.on(`request-${userId}`, onRequest);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      // socket.off('request', onRequest);
    };
  }, []);

  return (
    <div >
      <div>
        <Link to="usersIndex">User Index</Link>
        <Search></Search>
        <span>Welcome user {userId}</span>
        <button onClick={onClickTest}>request Test</button>
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
              <Intro user ={newUser} ></Intro>
            </div>
            <div>
              <FriendRequest userId = {params.userId} ></FriendRequest>
            </div>
            <div>
              <Friends userId = {params.userId} ></Friends>
            </div>
            
        </div>
      </div>
            
      <div>
          <Link to ="postsIndex">Recent Posts</Link>
          <Posts userId ={params.userId}></Posts>
        </div>
    </div>
      </div>
      
    
  )
}

export default Profile