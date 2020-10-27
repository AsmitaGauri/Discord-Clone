import React,{useState,useEffect} from 'react'
import '../assets/chat.css';
import {useSelector} from 'react-redux'
import ChatHeader from './ChatHeader';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import Message from './Message';
import {selectChannelId,selectChannelName} from '../features/appSlice';
import {selectUser} from '../features/userSlice'
import firebase from 'firebase';
import db from '../firebase';
function Chat() {
    const user = useSelector(selectUser);
    const channelName = useSelector(selectChannelName);
    const channelId = useSelector(selectChannelId);
    const [input, setinput] = useState("");
    const [messages, setmessages] = useState([]);

    useEffect(() => {
        if(channelId){
            db.collection("channels").doc(channelId).collection("messages")
            .orderBy("timestamp")
            .onSnapshot((snapshot)=> setmessages(snapshot.docs.map((doc)=>doc.data())))
        }
    }, [channelId])
 console.log(channelId);
 console.log(messages);
    const sendMessage=(event)=>{
        event.preventDefault();
        db.collection("channels").doc(channelId).collection("messages").add({
            message:input,
            user:user,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
        setinput("");
    }

    return (
        <div className="chat">
        
            <ChatHeader channelName={channelName}/>
            <div className="chat__messages">
               
               {
                   messages.map((message)=>(
                       <Message message={message.message} timestamp={message.timestamp} user={message.user}/>
    ))
               }
            </div>
            <div className="chat__input">
                <AddCircleIcon fontSize="large"/>
                <form action="">
                    <input type="text" placeholder={`Message #${channelName}`} onChange={(event)=>setinput(event.target.value)} value={input} disabled={!channelId}/>
                    <button type="submit" className="chat__inputButton" onClick={sendMessage} disabled={!channelId}>Send Message</button>
                </form>
                <div className="chat__inputIcons">
                    <CardGiftcardIcon fontSize="large"/>
                    <GifIcon  fontSize="large"/>
                    <InsertEmoticonIcon  fontSize="large"/>
                </div>
            </div>
        </div>
    )
}

export default Chat
