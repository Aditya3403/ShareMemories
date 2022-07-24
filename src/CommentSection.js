import React from "react";
import './CommentSection.css';
import UserComment from "./UserComment";

const CommentSection = (props) => {
  return (

      <div className="CommentSection">
        <div className="comment-box">
          <div className="comment-box-image">
            <img />
          </div>
          <div className="comment-box-comments">
            <div className="comment-box-comments-heading">
              <h4>{props.username}</h4>
            </div>
            <div className="comment-box-comments-usercomment">
              <UserComment />
            </div>
            <div className="comment-box-comments-commentbar">
              <input
                type="text"
                name="comment"
                placeholder="Add a comment..."
              />
              <a href="">Post</a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default CommentSection;
