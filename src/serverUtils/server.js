

async function logIn(formData){
  const body = {
    email:formData.get("userName"),
    password:formData.get("password"),
  };
  let verified = {};
  let response = await fetch("http://localhost:3000/user/login",{
    mode:"cors",
    method:"POST",
    credentials:"include",
    headers:{
        "Content-Type":"application/json",
    },
    body:JSON.stringify(body),
  });
  if(response.status === 200){
    let token = await response.json();
    localStorage.setItem("authToken", token.token);
    console.log(localStorage.getItem("authToken"));
    console.log(token);
    token = token.token.split('.');
    let user = JSON.parse(atob(token[1])).user;
    verified = {user:user,verify:true};
    return verified;
  }
  else{
    console.log("Invalid Login credentials");
    return false;
  }
}

export { logIn };