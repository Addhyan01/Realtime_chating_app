import React, { useContext, useEffect, useState } from 'react'
import "./Chat.css"
import LeftSideBar from '../../component/LeftSideBar/LeftSideBar';
import ChatBox from '../../component/ChatBox/ChatBox';
import RightSideBar from '../../component/RightSideBar/RightSideBar';
import { AppContext } from '../../context/AppContext';

const Chat = () => {
  const {chatData, userData} = useContext(AppContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(chatData && userData){
      setLoading(false);
    }
  }, [chatData, userData]);

  return (
    <div className='chat'>
      {
        loading ? <p className='loading'>Loading...</p>
        :
        <div className="chat-container">
        <LeftSideBar />
        <ChatBox />
        <RightSideBar />
      </div>
      }

      
    </div>
  )
}

export default Chat;
