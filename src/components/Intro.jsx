

function Intro({user}){
  console.log(user);
  return(
    <div className ="intro">
      <img className="profileAvatar" ></img>
      <button>Edit</button>
      <span>{user.firstname + ' ' +user.lastname  }</span>
      <button>Edit</button>
      <span>{user.email}</span>
      <button>Edit</button>
      <span>{}</span>
      <button>Edit</button>
    </div>
  )
}

export default Intro