import { faker } from '@faker-js/faker';
function Posts(){

  return(
    <div className ="postArea">
        <div className='postSubmission'>
          <textarea></textarea>
          <button>Submit new post!</button>
        </div>
        <div className ="posts">
          <div className="post">
            <span>Blah blah blah blah blah blah</span>
            <button>Like</button>
            <div className ="comments">
              <textarea></textarea>
              <button>Post Comment</button>
            </div>
          </div>
          <div className="post">
            <span>Blah blah blah blah blah blah</span>
            <button>Like</button>
            <div className ="comments">
              <textarea></textarea>
              <button>Post Comment</button>
            </div>
          </div>
          <div className="post">
            <span>Blah blah blah blah blah blah</span>
            <button>Like</button>
            <div className ="comments">
              <textarea></textarea>
              <button>Post Comment</button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Posts;