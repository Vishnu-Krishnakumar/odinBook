import { useState,useEffect } from "react";
import { updateProfile } from "../serverUtils/server";

function Intro({user, isOwnProfile}){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [isVisible,setIsVisible] = useState(false);

  function visible(){
    setIsVisible(!isVisible);
  }
  async function profileSubmit(e){
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    const update = await updateProfile(formData);
    console.log(update);
  }
  useEffect(() => {
    if (user) {
      setFirstName(user.firstname || '');
      setLastName(user.lastname || '');
      setEmail(user.email || '');
    }
  }, [user]);
  
  return(
    <div className ="intro">
     {!isVisible &&( 
       <>
         <img className="profileAvatar" ></img>
         <span>{user.firstname + ' ' + user.lastname}</span>
         <span>{user.email}</span>
         <span>{}</span>
       </>
      )}
      {isVisible &&(
        <>
          <form onSubmit={profileSubmit} className="profileUpdate">
            <label>First Name</label>
            <input type ="text" value={firstName} onChange= {(e) => setFirstName(e.target.value)}></input>
            <label>Last Name</label>
            <input type ="text" value={lastName} onChange= {(e) => setLastName(e.target.value)}></input>
            <label>Email</label>
            <input type ="email" value ={email} onChange= {(e) => setEmail(e.target.value)}></input>
            <button>Submit</button>
          </form>
        </>
      )}
      {isOwnProfile &&<button onClick={visible}>Edit</button>}
    </div>
  )
}

export default Intro