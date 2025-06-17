import { useNavigate } from "react-router-dom";

function SignIn(){
  const navigate = useNavigate();
  function formSubmit(formData){
    console.log("This probably isnt working right now");
    console.log(formData.get("userName"));
    console.log(formData.get("password"));
    navigate(`/profile`)
  }
  return(
    <div>
      <form action={formSubmit}>
        <label for ="userName">User Name:</label>
        <input type ="text" id = "userName" name = "userName"></input>
        <label for = "password">Password:</label>
        <input type ="password" id ="password" name = "password"></input>
        <input type = "submit" value = "Submit"></input>
      </form>
    </div>
  )

}

export default SignIn