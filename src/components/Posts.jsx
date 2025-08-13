import { faker } from '@faker-js/faker';
import { useState,useEffect,useRef } from 'react'; 
import { useFormStatus } from 'react-dom';
import { newPost,retrievePosts,likePost } from '../serverUtils/server';
import Comments from './Comments';
import { useAuth } from '../context/authContext';
import { Editor } from '@tinymce/tinymce-react';

function Posts({userId , isOwnProfile, }){
  
  const [textAreaValue, setTextAreaValue] = useState('');
  const [posts,setPosts] = useState([]);
  const editorRef = useRef(null);
  // const {pending} = useFormStatus();
  const { loggedUser,loading } = useAuth();  

  async function postSubmission(e){
    e.preventDefault();
    console.log(editorRef.current.getContent());
    console.log(e.target.userId.value);
    let body = {
      title :'',
      content : editorRef.current.getContent(),
      userId: parseInt(e.target.userId.value),
    }
    // const formData = new FormData({content:editorRef.current.getContent()});
    await newPost(body);
    setTextAreaValue('');
    let posts = await retrievePosts(userId);
    console.log(posts);
    if(posts)
      setPosts(posts);
  }

  async function like(e){
    // e.preventDefault();
    console.log(e.target);
    let postId = e.target.id
    console.log(loggedUser.user.id);
    let response = await likePost(postId,loggedUser.user.id);
    console.log(response);
    retrieve();
  }

  async function retrieve(){
    const newPosts = await retrievePosts(userId);
    setPosts(newPosts);
  }

  useEffect( ()=>{
    retrieve();
  },[userId])

  return(
    <div className ="postArea">
        {isOwnProfile &&
       
          <div className='postSubmission'>
            <h2>New Post</h2>
            <form onSubmit={postSubmission}>
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
              <input type = "hidden" value = {userId} name ="userId"></input>
              <button >Submit </button>
            </form>
          </div>
        }
        <div className ="posts">
          {posts.map((post,index)=>{
            return (
              <div key = {index} className="post">
                <span dangerouslySetInnerHTML={{ __html: post.content }}></span>
                <div>
                <span>{post.likes.length} likes!</span>
                <button onClick = {like} id = {post.id}>Like</button>
                </div>
                
                <Comments postId = {post.id}></Comments>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Posts;