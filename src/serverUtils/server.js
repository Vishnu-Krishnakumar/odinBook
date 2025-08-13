

async function register(formData){
  const body = {
    firstname : formData.get('firstname'),
    lastname : formData.get('lastname'),
    email : formData.get('email'),
    password : formData.get('password'),
    passwordRepeat : formData.get('passwordRepeat'), 
  }

  let response = await fetch('http://localhost:3000/user/register',{
    mode:"cors",
    method: "POST",
    credentials: "include",
    headers: { 
      "Content-Type" : "application/json",
    },
    body:JSON.stringify(body),
  });
  return response;

}

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
    
    // console.log(localStorage.getItem("authToken"));
    // console.log(token);
    // token = token.token.split('.');
    // let user = JSON.parse(atob(token[1])).user;
    // verified = {user:user,verify:true};
    return token.token;
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

async function newPost(body){
  // const body = {
  //   title:'',
  //   content:formData.get("content"),
  //   userId:formData.get("userId"),
  // }
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

async function retrieveComments(postId){
  let response = await fetch (`http://localhost:3000/comments/${postId}`,{
    mode:"cors",
    method:"GET",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
  });
  let comments = await response.json();
  console.log(comments);
  return comments;
}

async function submitComment(body){
  // let postId = formData.get("postId");
  // const body = {
  //   content:formData.get("content"),
  //   userId:formData.get("userId"),
  //   postId: postId,
  //   email: formData.get("username"),
  // }
  console.log(body);
  let response = await fetch(`http://localhost:3000/comments/${body.postId}`,{
    mode:"cors",
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(body),
  });
  let submission = await response.json();
  console.log(submission);
  return submission;
}

async function likePost(postId,userId){
  const body = {
    id:userId,
    postId:postId,
  }
  let response = await fetch('http://localhost:3000/posts/likePost',{
    mode:"cors",
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(body)
  })
  response = await response.json();
  console.log(response);
  return response;
}

async function friendList(userId){
  let response = await fetch(`http://localhost:3000/user/profile/friendList/${userId}`,{
    mode:"cors",
    method:"GET",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
  });
  response = await response.json();

  return response;
}

async function updateProfile(formData){
  const body = {
    firstname : formData.get('firstname'),
    lastname : formData.get('lastname'),
    email : formData.get('email'),
    originalEmail : formData.get('originalEmail'),
  }
  let response = await fetch (`http://localhost:3000/user/profileUpdate`,{
    mode:"cors",
    method:"POST",
    credentials:"include",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(body)
  })
  console.log(response);
  response = await response.json();
  return response;
}

async function profilePictureUpload(formData){

  let response = await fetch (`http://localhost:3000/user/profilePictureUpload`,{
    mode:"cors",
    method:"POST",
    credentials:"include",
    body: formData,
  })
  console.log(response);
  response = await response.json();
  console.log(response);
}

async function userList(){
  let response = await fetch('http://localhost:3000/user/userList',{
    mode:"cors",
    method:"GET",
    credentials:"include",
  })
  response = await response.json();
  return response;
}

async function userListIntro(){
  let response = await fetch('http://localhost:3000/user/userListIntro',{
    mode:"cors",
    method:"GET",
    credentials:"include",
  })
  console.log(response);
  response = await response.json();
  return response;
}
async function friendRequests(){
  let response = await fetch ('http://localhost:3000/user/friendRequests',{
    mode:"cors",
    method:"GET",
    credentials:"include",
  })
  console.log(response);
  response = await response.json();
  return response;
}

async function recentPosts(){
  let response = await fetch(`http://localhost:3000/posts/recentPosts`,{
    mode:"cors",
    method:"GET",
    credentials:"include",
  })
  console.log(response);
  response = await response.json();
  console.log(response);
  return response;
}

export {
  register,
  logIn,
  newPost,
  retrievePosts,
  retrieveUser,
  retrieveComments,
  submitComment,
  likePost,
  friendList,
  updateProfile,
  profilePictureUpload,
  userList,
  userListIntro,
  friendRequests,
  recentPosts,
};