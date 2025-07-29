import { faker } from '@faker-js/faker';
import { useState,useEffect } from 'react'; 
import { useFormStatus } from 'react-dom';
import { newPost,retrievePosts } from '../serverUtils/server';
import Comments from './Comments';
function Posts({userId , isOwnProfile}){
  const [textAreaValue, setTextAreaValue] = useState('');
  const [posts,setPosts] = useState([]);
  // const {pending} = useFormStatus();

  async function postSubmission(e){
    e.preventDefault();
    const formData = new FormData(e.target);
    await newPost(formData);
    setTextAreaValue('');
    let posts = await retrievePosts(userId);
    console.log(posts);
    setPosts(posts);
  }

  useEffect( ()=>{
    async function retrieve(){
      const newPosts = await retrievePosts(userId);
      setPosts(newPosts);
    }
    retrieve();
  },[userId])

  return(
    <div className ="postArea">
        {isOwnProfile &&
          <div className='postSubmission'>
            <form onSubmit={postSubmission}>
              <textarea value = {textAreaValue}
              onChange= {(e) => setTextAreaValue(e.target.value)}
              name ="content"></textarea>
              <input type = "hidden" value = {userId} name ="userId"></input>
              <button >Submit </button>
            </form>
          </div>
        }
        <div className ="posts">
          {posts.map((post,index)=>{
            return (
              <div key ={index} className="post">
                <span>{post.content}</span>
                <button id = {post.id}>Like</button>
                <Comments postId ={post.id}></Comments>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default Posts;