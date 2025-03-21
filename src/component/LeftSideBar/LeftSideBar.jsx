import React from 'react'
import "./LeftSideBar.css"
import assets from '../../assets/assets'

const LeftSideBar = () => {
  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo}  className="logo" alt="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder='Search here...' />
        </div>
      </div>
      <div className="ls-list">
      {Array(21).fill("").map((item, index)=>( 
        <div  key={index} className="friends">
          <img src={assets.profile_img} alt="" />
          <div>
            <p>User Name</p>
            <span>Hello, How r u?</span>
          </div>
        </div>

      ))}

        
      </div>
    </div>
  )
}

export default LeftSideBar