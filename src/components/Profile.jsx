import { faker } from '@faker-js/faker';
import Intro from './Intro'
import Posts from './Posts';
import Friends from './Friends';
import Users from './Users';
import { Link } from 'react-router-dom';
import Search from './Search';
import UsersIndex from './UsersIndex';
const Profile = () => {

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

  console.log(user);

  return (
    <div >
      <div>
        <Link to="usersIndex">Users Index</Link>
        <Search></Search>
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