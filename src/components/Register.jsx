import { register } from '../serverUtils/server';
import { useState } from 'react';
import { useNavigate,useNavigation  } from "react-router-dom";
function Register(){
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  async function formSubmit(e){
    e.preventDefault()
    const formData = new FormData(e.target);
    let created = await register(formData);
    console.log(created)
    if (created.status === 201){
      navigate('/signIn')
    }
    else {
      let error = await created.json();
      console.log(error);
    }
  }

  return(
    <>
    <div>
      <form onSubmit={formSubmit}>
        <label htmlFor="firstname">First Name:</label>
        <input type ="text" id = "firstName" name ="firstname"></input>
        <label htmlFor="lastname">Last Name:</label>
        <input type ="text" id = "lastName" name ="lastname"></input>
        <label htmlFor ="email">Email:</label>
        <input type ="text" id = "email" name = "email"></input>
        <label htmlFor = "password">Password:</label>
        <input type ="password" id ="password" name = "password"></input>
        <label htmlFor="passwordRepeat">Repeat Password:</label>
        <input type ="password" id = "passwordRepeat" name ="passwordRepeat"></input>
        <input type = "submit" value = "Submit"></input>
      </form>
    </div>
    </>
  )
}

export default Register;