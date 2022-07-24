import React,{useEffect,useState} from 'react';
import './Home.css';
import PostCards from './PostCards';

// import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const [postData,setPostData] = useState([]);
  const [postImage,setPostImage] = useState();
  const userDashboard = async() => {
    try {
      const res = await fetch("home",{
        method:"GET",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        },
        credentials:"include"
        });
        const data = await res.json();
        data.postImages = "http://localhost:5000/static/uploads/" + data.postImages;
        setPostData(data);
      
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(()=>{
    userDashboard();
  },[])
 
  
  return (
    <>
      <div className='homePage'>
        {postData.map((data)=>{
          return (
            <>
              <PostCards  _id={data.user_id} username={data.username} description={data.postDescription}/>
            </>
          )
        })}
      </div>
    </>
      
  )
}

export default Home