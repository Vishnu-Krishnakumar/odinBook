import { useEffect, useState } from "react";
import { recentPosts } from "../serverUtils/server";
function PostsIndex() {
  const [posts,setPosts] = useState([]);

  async function recent(){
    let rPosts = await recentPosts();
    setPosts(rPosts);
  }

  useEffect(()=>{
    recent();
  },[])
    return (
      <div>
       {posts.map((post,index)=>{
        return(
        <div className="recentPost" key = {index}>
          <a href={"http://127.0.0.1:5173/profile/" + post.authorId}>{post.firstname + " " + post.lastname} </a>
          <span>{post.content}</span>
        </div>
       ) })}
      </div>
    );
  }

export default PostsIndex;