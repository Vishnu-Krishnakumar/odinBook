import { Link } from "react-router-dom";

function Main (){

  return(
    <div>
      <header>welcome to HootBook!</header>
      <Link to ="signIn">Sign In</Link>
      <Link to = "register">Register</Link>
    </div>
  )

}

export default Main 