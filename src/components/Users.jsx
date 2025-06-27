import { faker } from '@faker-js/faker';
function Users() {
  
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

  const users = faker.helpers.multiple(createRandomUser, {
    count: 5,
  });
  console.log(users);
  return (
    <div>
      <span>People you might know!</span>
      <div className='randomUsers'>
      <div className = "randomUser">
        <img className="profileAvatar" src={users[0].avatar}></img>
        <span>{users[0].username}</span>
        <button>Friend Request!</button>
      </div>
      <div className = "randomUser">
        <img className="profileAvatar" src={users[1].avatar}></img>
        <span>{users[1].username}</span>
        <button>Friend Request!</button>
      </div>
      <div className = "randomUser">
        <img className="profileAvatar" src={users[2].avatar}></img>
        <span>{users[2].username}</span>
        <button>Friend Request!</button>
      </div>
      <div className = "randomUser">
        <img className="profileAvatar" src={users[3].avatar}></img>
        <span>{users[3].username}</span>
        <button>Friend Request!</button>
      </div>
      <div className = "randomUser">
        <img className="profileAvatar" src={users[4].avatar}></img>
        <span>{users[4].username}</span>
        <button>Friend Request!</button>
      </div>
      </div>
      
    </div>
)
}

export default Users;