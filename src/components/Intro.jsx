import { useState,useEffect } from "react";
import { updateProfile,profilePictureUpload } from "../serverUtils/server";

function Intro({user, isOwnProfile}){
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email,setEmail] = useState('');
  const [originalEmail,setOriginalEmail] = useState('');
  const [isVisible,setIsVisible] = useState(false);

  function visible(){
    setIsVisible(!isVisible);
  }
  async function profileSubmit(e){
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    console.log(formData.get('email'));
    let update = await updateProfile(formData);
    console.log(update);
  }
  async function pictureSubmit(e){
    e.preventDefault();
    console.log(e.target.profilePicture.files[0]);
    const formData = new FormData();
    formData.append('avatar',e.target.profilePicture.files[0]);
    console.log(formData);
    await profilePictureUpload(formData);
  }
  useEffect(() => {
    if (user) {
      setFirstName(user.firstname || '');
      setLastName(user.lastname || '');
      setEmail(user.email || '');
      setOriginalEmail(user.email || '');
    }
  }, [user]);
  
  return(
    <div className ="intro">
     {!isVisible &&( 
       <>
         <img src={user.profilepic}className="profileAvatar" ></img>
         <span>{user.firstname + ' ' + user.lastname}</span>
         <span>{user.email}</span>
         <span>{}</span>
       </>
      )}
      {isVisible &&(
        <>
          <form onSubmit={pictureSubmit}>
            <input type ="file" name ="avatar"></input>
            <button type = "submit">Submit Picture</button>
          </form>
          <form onSubmit={profileSubmit} className="profileUpdate">
            <label>First Name</label>
            <input type ="text" name="firstname" value={firstName} onChange= {(e) => setFirstName(e.target.value)}></input>
            <label>Last Name</label>
            <input type ="text" name="lastname" value={lastName} onChange= {(e) => setLastName(e.target.value)}></input>
            <label>Email</label>
            <input type ="email" name="email" value ={email} onChange= {(e) => setEmail(e.target.value)}></input>
            <input type ="hidden" value = {originalEmail} name ="originalEmail"></input>
            <button type = "submit">Submit</button>
          </form>
        </>
      )}
      {isOwnProfile &&<button onClick={visible}>Edit</button>}
    </div>
  )
}

export default Intro