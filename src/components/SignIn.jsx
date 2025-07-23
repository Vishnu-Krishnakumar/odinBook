import { useNavigate,useNavigation  } from "react-router-dom";
import { logIn } from '../serverUtils/server';
import { useState,useEffect } from "react";
import { socket } from '../sockets/socket';
function SignIn(){
  const navigate = useNavigate();

  const [userId, setUserId] = useState(2);

  

  async function formSubmit(e){
    e.preventDefault();
    console.log("This probably isnt working right now");
    const formData = new FormData(e.target);
    console.log(formData.get("userName"));
    console.log(formData.get("password"));
    let verified = await logIn(formData);
    if (!verified) return;
    else{
      console.log(verified.user);
      socket.connect();
      navigate('/profile', {
        state: {
          userId: verified.user.id,
        },
      });
    }
  
  }

  return(
    <div>
      <form onSubmit={formSubmit}>
        <label htmlFor ="userName">User Name:</label>
        <input type ="text" id = "userName" name = "userName"></input>
        <label htmlFor = "password">Password:</label>
        <input type ="password" id ="password" name = "password"></input>
        <input type = "submit" value = "Submit"></input>
      </form>
    </div>
  )

}

export default SignIn