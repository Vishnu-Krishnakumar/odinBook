import { faker } from '@faker-js/faker';
function UsersIndex(){
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
  count: 25,
  });
  console.log(users);
  return (
    <div>
      {users.map((user)=>{
        return (
          <div className = "randomUser">
            <img className="profileAvatar" src={user.avatar}></img>
            <span>{user.username}</span>
            <button>Friend Request!</button>
          </div>
        )
        
      })}
    </div>
  )
}

export default UsersIndex;