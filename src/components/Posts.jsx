import { faker } from '@faker-js/faker';
import { useState } from 'react'; 
import { useFormStatus } from 'react-dom';
import { newPost,retrievePosts } from '../serverUtils/server';
function Posts({userId}){
  const [textAreaValue, setTextAreaValue] = useState('');
  const [posts,setPosts] = useState([]);
  const {pending} = useFormStatus();

  async function postSubmission(e){
    e.preventDefault();
    console.log(e.target);
    const formData = new FormData(e.target);
    console.log(formData);
    await newPost(formData);
    setTextAreaValue('');
    let posts = await retrievePosts(userId);
    setPosts(posts);
    console.log(posts);
  }

  useState(async ()=>{
    const newPosts = await retrievePosts(userId);
    setPosts(newPosts);
  },[])

  return(
    <div className ="postArea">
        <div className='postSubmission'>
          <form onSubmit={postSubmission}>
            <textarea value = {textAreaValue}
             onChange= {(e) => setTextAreaValue(e.target.value)}
             name ="content"></textarea>
             <input type = "hidden" value = {userId} name ="userId"></input>
            <button disabled={pending} >{pending ? "Submitting..." : "Submit"} </button>
          </form>
    
        </div>
        <div className ="posts">
          {posts.map((post,index)=>{
            return (
              <div key ={index} className="post">
                <span>{post.content}</span>
                <button id = {post.id}>Like</button>
                <div className ="comments">
                  <textarea></textarea>
                  <button>Post Comment</button>
                </div>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Posts;