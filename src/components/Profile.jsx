import { faker } from '@faker-js/faker';
import Intro from './Intro'
import Posts from './Posts';
import Friends from './Friends';
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
    <div className ="userProfile">
      <div>
        <div>
          <span>welcome</span>
          <Intro user ={user} ></Intro>
        </div>
        <div>
          <Friends></Friends>
        </div>
      </div>
      
      <div>
        <Posts></Posts>
      </div>
    </div>
  )
}

export default Profile