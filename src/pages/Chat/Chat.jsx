import React from 'react'
import "./Chat.css"
import LeftSideBar from '../../component/LeftSideBar/LeftSideBar';
import ChatBox from '../../component/ChatBox/ChatBox';
import RightSideBar from '../../component/RightSideBar/RightSideBar';

const Chat = () => {
  return (
    <div className='chat'>

      <div className="chat-container">
        <LeftSideBar />
        <ChatBox />
        <RightSideBar />
      </div>
    </div>
  )
}

export default Chat;
