import React,{useState,useEffect} from 'react';
import './PostCards.css';
import { incNumber,decNumber } from './Actions/index';
import {useDispatch} from "react-redux";
import {Link } from 'react-router-dom';
import store from './store';
import UserComment from './UserComment';
import CommentSection from './CommentSection';
const PostCards = (props) => {
  const dispatch = useDispatch();
  const [comment,setComment] = useState();
  const [Liked,setLiked] = useState({
    "color":"#ED4956"
  });
  const liked = async() =>{
    document.querySelector(".fa-heart").classList.add("liked");
    
    try {
      const res = await fetch("likes",{
        method:"POST",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username:props.username,user_id:props._id
        })
        });
      
    } catch (error) {
      console.log(error);
    }

  }
  const commentData = async() =>{
    
    try {
      const res = await fetch("comments",{
        method:"POST",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        },
        body: JSON.stringify({
          username:props.username,comment:comment
        })
        });
      
    } catch (error) {
      console.log(error);
    }

  }
 
  return (
    <>
   
    <div className="card" >
       
      <div className="card-body">
        <img src={props.img} alt="" />
        <div className='icons-button'> 
          <div className='icons'>
            <a href="#" onClick={liked}><i className="fa-regular fa-heart fa-2x "></i></a>
            <Link to="#"><i class="fa-regular fa-comment fa-2x"></i></Link>
          </div>
          <div className='btn'>
            <button onClick={ dispatch( incNumber(1) ) }>follow</button>
          </div>
        </div>
        <div className='user-details'>
          
          <h5 className="card-title">{props.username}</h5>
        </div>
        
        <p className="card-text">{props.description}</p>
        <div className='commentbar'>
          <input type="text" name='comment' value={comment} onChange={(e)=>setComment(e.target.value)}placeholder='Add a comment...'/>
          <a href='#' onClick={commentData}>Post</a>
          
        </div>
        
      </div>
    
    </div>
    </>
  )
}

export default PostCards;