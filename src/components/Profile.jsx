import { faker } from '@faker-js/faker';
import { useState,useEffect } from 'react';
import Intro from './Intro'
import Posts from './Posts';
import Friends from './Friends';
import Users from './Users';
import { Link,useLocation  } from 'react-router-dom';
import Search from './Search';
import UsersIndex from './UsersIndex';
import { socket } from '../sockets/socket';

function Profile({route}){
  const location = useLocation();
  const { userId, isConnected } = location.state || {};

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
      sender:3,
      receiver:1,
    }
    console.log(user);
    socket.emit("sendRequest",user);
  }


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
              <Intro user ={user} ></Intro>
            </div>
         <div>
            <Friends></Friends>
          </div>
        </div>
      </div>
            
      <div>
          <Link to ="postsIndex">Recent Posts</Link>
          <Posts></Posts>
        </div>
    </div>
      </div>
      
    
  )
}

export default Profile