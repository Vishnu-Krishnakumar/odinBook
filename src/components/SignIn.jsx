import { useNavigate } from "react-router-dom";

function SignIn(){
  const navigate = useNavigate();
  function formSubmit(e){
    e.preventDefault();
    console.log("This probably isnt working right now");
    const formData = new FormData(e.target);
    console.log(formData.get("userName"));
    console.log(formData.get("password"));
    navigate(`/profile`)
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