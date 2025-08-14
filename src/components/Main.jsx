import { Link } from "react-router-dom";

function Main (){

  return(
    <div className="introPage">
      <header>welcome to OdinBook!</header>
      <Link to ="signIn">Sign In</Link>
      <Link to ="register">Register</Link>
    </div>
  )

}

export default Main 