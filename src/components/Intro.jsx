

function Intro({user}){
  console.log(user);
  return(
    <div className ="intro">
      <img className="profileAvatar" src={user.avatar}></img>
      <button>Edit</button>
      <span>{user.username}</span>
      <button>Edit</button>
      <span>{user.email}</span>
      <button>Edit</button>
      <span>{user.birthdate.toLocaleDateString()}</span>
      <button>Edit</button>
    </div>
  )
}

export default Intro