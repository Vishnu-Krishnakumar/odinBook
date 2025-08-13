import { useEffect, useState,useRef } from "react"
import { retrieveComments } from "../serverUtils/server";
import { useFormStatus } from 'react-dom';
import { useAuth } from '../context/authContext';
import { submitComment } from "../serverUtils/server";
import { Editor } from '@tinymce/tinymce-react';
function Comments({postId}){
  const [comments,setCommments] = useState([]);
  const [textAreaValue, setTextAreaValue] = useState('');
  const [isVisible,setIsVisible] = useState(false);
  const {pending} = useFormStatus();
  const { loggedUser,loading } = useAuth();
  const editorRef = useRef(null);

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
    // const formData = new FormData(e.target);
    let body = {
      content: editorRef.current.getContent(),
      userId: parseInt(e.target.userId.value),
      postId: parseInt(e.target.postId.value),
      email:  e.target.username.value,
    }
    console.log(body);
    let response = await submitComment(body);
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
               <span dangerouslySetInnerHTML={{ __html: comment.content }}></span>
             </div>
           )
         })}
         <div className ="commentSubmission">
           <form onSubmit={commentSubmission}>
             {/* <textarea value = {textAreaValue}
              onChange= {(e) => setTextAreaValue(e.target.value)}
              name ="content"></textarea> */}
              <Editor
                apiKey={import.meta.env.VITE_tinyApiKey}
                onInit={(evt, editor) => editorRef.current = editor}
                init={{
                plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                menubar: false,
                content_css:["dark"],
                }}
                initialValue="Post something interesting!"
              />
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