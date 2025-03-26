import React, { useContext, useEffect, useState } from 'react'
import './ChatBox.css'
import assets from '../../assets/assets'
import { AppContext } from '../../context/AppContext';
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import upload from '../../lib/uplode';
import { toast } from 'react-toastify';
// import { AppContext } from '../../context/AppContext';

const ChatBox = () => {

  const { userData, messageId, messages, setMessages, chatUser, chatVisible, setChatVisible } = useContext(AppContext);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    try {
      if (input && messageId) {
        await updateDoc(doc(db, "messages", messageId), {
          messages: arrayUnion({
            sId: userData.id,
            text: input,
            createdAt: new Date()

          })

        })

        const userIds = [chatUser.rId, userData.id];

        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapShot = await getDoc(userChatsRef);

          if (userChatsSnapShot.exists()) {
            const userChatData = userChatsSnapShot.data();
            const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messageId);
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData
            })
          }
        })
      }
    }
    catch (error) {
      toast.error(error.message);
    }
    setInput("");
  }


  const sendImage = async (e) => {
    const file = e.target.files[0];

    try {
      const fileUrl = await upload(e.target.files[0]);
      if(fileUrl && messageId){
        await updateDoc(doc(db, "messages", messageId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: new Date()

          })

        })

        const userIds = [chatUser.rId, userData.id];

        userIds.forEach(async (id) => {
          const userChatsRef = doc(db, "chats", id);
          const userChatsSnapShot = await getDoc(userChatsRef);

          if (userChatsSnapShot.exists()) {
            const userChatData = userChatsSnapShot.data();
            const chatIndex = userChatData.chatsData.findIndex((c) => c.messageId === messageId);
            userChatData.chatsData[chatIndex].lastMessage = "Image";
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData
            })
          }
        })

      }
    }
    catch (error) {
      toast.error(error.message);
    }

  }

  const covertTimeStamp = (timestamp) => {
    let date = timestamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if (hour > 12 ){
      return hour - 12 + ":" + minute + " PM";
    }
    else{
      return hour + ":" + minute + " AM";
    }
  }

  useEffect(() => {
    if (messageId) {
      const unSub = onSnapshot(doc(db, "messages", messageId), (res) => {
        setMessages(res.data().messages.reverse());


      })
      return () => {
        unSub();
      }
    }

  }, [messageId])


  return chatUser ? (
    <div className={`chat-box ${chatVisible ? "" : "hidden"}`}>
      <div className='chat-user'>
        <img src={chatUser.userData.avatar} alt="" />
        <p>{chatUser.userData.name} {Date.now()-chatUser.userData.lastSeen < 70000 ? <img src={assets.green_dot} className='dot' alt=""/> : null} </p>
        <img src={assets.help_icon} className='help' alt="" />
        <img src={assets.arrow_icon} className='arrow' onClick={() => setChatVisible(false)} alt="" />

      </div>

      <div className="chat-msg">
        {
          messages.map((msg, index) => (
            <div key={index} className={msg.sId === userData.id ? "s-msg" : "r-msg"}>
              {
                msg["image"] 
                ?
                <img className='msg-img' src={msg.image} alt="" />
                :
                <p className='msg'>{msg.text}</p>
              }
              
              <div>
                <img src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar} alt="" />
                <p>{covertTimeStamp(msg.createdAt)}</p>
              </div>
            </div>

         )) }
        
      </div>

      <div className="chat-input">
        <input type="text" onChange={(e) => setInput(e.target.value)} value={input} placeholder='send a message' />
        <input type="file" onChange={sendImage} id='image' accept='image/png, image/jpeg' hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="" />

      </div>
    </div>
  ) :
    <div className={`chat-welcome ${chatVisible ? "" : "hidden"}`}>
      <img src={assets.logo_icon} alt="" />
      <p>Chat anytime, anywhere</p>
    </div>
}

export default ChatBox