import { useNavigate,useNavigation  } from "react-router-dom";
import { logIn } from '../serverUtils/server';
import { useState,useEffect } from "react";
import { socket } from '../sockets/socket';
import { useAuth } from '../context/authContext';
function SignIn(){
  const navigate = useNavigate();

  const [userId, setUserId] = useState(2);
  const {loggedUser,login,logout,loading}  = useAuth();
  let verified = null;

  async function formSubmit(e){
    e.preventDefault();
    console.log("This probably isnt working right now");
    const formData = new FormData(e.target);

    logout();
    let token = await logIn(formData);

    socket.connect();
    login(token);

  }

  useEffect(() => {
    if (!loading && loggedUser) {
      console.log("User is logged in:", loggedUser);
      console.log(loggedUser.user);
      socket.connect();
      navigate(`/profile/${loggedUser.user.id}`, {
             state: {
               userId: loggedUser.user.id,
             },
      });
    }
  }, [loggedUser, loading]);

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