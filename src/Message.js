import React from 'react';
import './Message.css';
import ProfileImage from './ProfileImage';

const Message = () => {
  return (
    <div className='message'>
      <div className='messagePage'>
        <div className='messagePage-followers'>
          <ProfileImage/>
          <ProfileImage/>
          <ProfileImage/>
          <ProfileImage/>
          <ProfileImage/>
          <ProfileImage/>
          <ProfileImage/>

        </div>
        <div className='messagePage-chat'>

        </div>

      </div>
    </div>
  )
}

export default Message