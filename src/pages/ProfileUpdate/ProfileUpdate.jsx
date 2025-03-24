import React, { useState } from 'react';
import "./ProfileUpdate.css"
import assets from "../../assets/assets"

const ProfileUpdate = () => {
  const [image, setImage] = useState(false);

  return (
    <div className="profile">
      <div className="profile-container">
        <form>
          <h3>Profile Details</h3>
          <label htmlFor='avatar'>
            <input type="file" id='avatar' onChange={(e) => setImage(e.target.files[0])} accept='.png, .jpg, .jpeg' hidden />
              <img src={image? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
              upload profile image
          </label>
          <input type="text" placeholder='Your name' required />
          <textarea placeholder='Write profile bio...'></textarea>
          <button type='submit'>Save</button>

        </form>
        <img className='profile-pic'  src={ image? URL.createObjectURL(image) : assets.avatar_icon} alt="" />
      </div>
    </div>
  )
}

export default ProfileUpdate