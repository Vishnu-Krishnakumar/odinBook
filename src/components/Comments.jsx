import { useEffect, useState } from "react"
import { retrieveComments } from "../serverUtils/server";
import { useFormStatus } from 'react-dom';
import { useAuth } from '../context/authContext';
import { submitComment } from "../serverUtils/server";
function Comments({postId}){
  const [comments,setCommments] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isVisible,setIsVisible] = useState(false);
  const {pending} = useFormStatus();
  const { loggedUser,loading } = useAuth();

  async function commentFetch(){
    let comments = await retrieveComments(postId);
    setCommments(comments);
  }
  function visible(){
    setIsVisible(!isVisible);
  }
  async function commentSubmission(e){
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    let response = await submitComment(formData);
    console.log(response);
    commentFetch();
  }

  useEffect(()=>{ 
    commentFetch();
  },[])
  return (
    <>
      <button onClick={visible}>{comments.length} Comments</button>
      {isVisible &&(
         <div className ="comments">
         {comments.map((comment,index)=>{
           return (
             <div className="comment" key ={index}>
               <span>{comment.username}</span>
               <span>{comment.content}</span>
             </div>
           )
         })}
         <div className ="commentSubmission">
           <form onSubmit={commentSubmission}>
             <textarea value = {textAreaValue}
              onChange= {(e) => setTextAreaValue(e.target.value)}
              name ="content"></textarea>
              <input type = "hidden" value = {loggedUser.user.email} name ="username"></input>
              <input type = "hidden" value = {loggedUser.user.id} name ="userId"></input>
              <input type = "hidden" value = {postId} name ="postId"></input>
             <button disabled={pending} >{pending ? "Submitting comment..." : "Submit Comment"} </button>
           </form>
         </div>
       </div>
      )}
     
    </>
  )
}

export default Comments