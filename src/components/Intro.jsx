

function Intro({user, isOwnProfile}){
  console.log(isOwnProfile);
  return(
    <div className ="intro">
      <img className="profileAvatar" ></img>
      {isOwnProfile &&<button>Edit</button>}
      <span>{user.firstname + ' ' +user.lastname  }</span>
      {isOwnProfile &&<button>Edit</button>}
      <span>{user.email}</span>
      {isOwnProfile &&<button>Edit</button>}
      <span>{}</span>
      {isOwnProfile &&<button>Edit</button>}
    </div>
  )
}

export default Intro