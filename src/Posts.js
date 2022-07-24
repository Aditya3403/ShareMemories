import React,{useState,useEffect} from 'react'
import './Posts.css';
import ProfileImage from './ProfileImage';

const Posts = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [SelectedImage, setselectedImage] = useState();
  const [userdetails,setUserDetails] = useState("");
  const [postDescription,setpostDescription] = useState("");
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const postData = async() => {
    try {
      const res = await fetch("posts",{
        method:"POST",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        },
        body: JSON.stringify({
          name:userdetails.name,postDescription:postDescription,username:userdetails.username
        })
        });
      
    } catch (error) {
      console.log(error);
    }

  }
  const userPosts = async() => {
    try {
      const res = await fetch("posts",{
        method:"GET",
        headers:{
        Accept:"application/json",
        "Content-Type":"application/json"
        },
        credentials:"include"
        });
        const data = await res.json();
        setUserDetails(data);
        data.profileImage = "http://localhost:5000/static/uploads/" + data.profileImage;
        setselectedImage(data.profileImage);
      
    } catch (error) {
      console.log(error);
    }

  }
  useEffect(()=>{
    userPosts();
  },[])
  return (
    <div className='Post'>
    <div className='postPage'>
      <div className='postPage-heading'>
        <h2>Create new Post</h2>
      </div>
      <div className='description'>
        <div className='post-image'>
          
          <img src={selectedImage}/>

        </div>
        <div className='post-description'>
          <div className='post-description-heading'>
            <img src={SelectedImage}/>
            <h4>{userdetails.username}</h4>
          </div>
          
          <form method='POST' encType="multipart/form-data">
            <textarea name='postDescription' placeholder='Write a caption...' value={postDescription} onChange={(e)=>setpostDescription(e.target.value)}></textarea>
            <input type="file" name='userPosts' onChange={imageChange}/>
            <button onSubmit={postData}>Share</button>
            
          </form>

        </div>

      </div>
    </div>
    
    </div>
  )
}

export default Posts