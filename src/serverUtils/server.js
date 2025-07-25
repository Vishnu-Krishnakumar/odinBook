

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
async function retrieveUser(userId){
  let response = await fetch(`http://localhost:3000/user/profile/${userId}`,{
    mode:"cors",
    method:"GET",
    credentials:"include",
    headers:{
      "Content-Type":"application/json",
    }
  })
  let user = await response.json();
  console.log(user);
  return user;
}
async function newPost(formData){
  const body = {
    title:'',
    content:formData.get("content"),
    userId:formData.get("userId"),
  }
  console.log(body);
  let response = await fetch("http://localhost:3000/posts/createPost",{
    mode:"cors",
    method:"POST",
    credentials:"include",
    headers:{
      "Content-type":"application/json"
    },
    body:JSON.stringify(body),
  });
  console.log(response);
  return response;
}

async function retrievePosts(userId){
  const body ={
    userId: userId
  }
  let response = await fetch(`http://localhost:3000/posts/getUserPosts/${userId}`,{
    mode:"cors",
    method:"GET",
    credentials:"include",
    headers:{
      "Content-type":"application/json"
    },
  });
  let posts = await response.json();
  console.log(posts);
  return posts;
}
export { logIn,newPost,retrievePosts,retrieveUser};