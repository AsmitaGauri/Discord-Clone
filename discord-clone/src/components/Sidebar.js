import React,{useState} from 'react';
import {useSelector} from 'react-redux'
import AddIcon from '@material-ui/icons/Add';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SignalCellularAltIcon from '@material-ui/icons/SignalCellularAlt';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import CallIcon from '@material-ui/icons/Call';
import '../assets/sidebar.css';
import SideBarChannel from './SideBarChannel';
import HeadsetIcon from '@material-ui/icons/Headset';
import SettingsIcon from '@material-ui/icons/Settings';
import MicIcon from '@material-ui/icons/Mic';
import { Avatar } from '@material-ui/core';
import { selectUser } from '../features/userSlice';
import db, { auth } from '../firebase';
import { useEffect } from 'react';
function Sidebar() {
    const user = useSelector(selectUser);
    const [channels, setchannels] = useState([]);

    useEffect(()=>{
        db.collection("channels").onSnapshot((snapshot)=>
            setchannels(snapshot.docs.map((doc)=>({
                id:doc.id,
                channel:doc.data()
            })))
        )
    },[])



const handleAddChannel=(event)=>{
    const channelName=prompt("Enter a channel name");
    if(channelName){
        db.collection("channels").add({
            channelName:channelName
        })
    }
}

    return (
        <div className="sidebar">
            <div className="siderbar__top"> 
            <h1>CODE RIT</h1>
            <ExpandMoreIcon/>
            </div>

            <div className="siderbar_channels">
                <div className="siderbar__channelsHeader">
                    <div className="siderbar_header">
                        <ExpandMoreIcon/>
                        <h4>Text Channels</h4>
                    </div>

                    <AddIcon className="siderbar__addChannel" onClick={handleAddChannel}/>
                </div>
                <div className="siderbar__channelList">
                    
                    {
                        channels.map(({channel,id})=>(
                            <SideBarChannel key={id} channel={channel.channelName} id={id}/>
                        ))
                    }
                </div>
            </div>

            <div className="siderbar__voie">
                <SignalCellularAltIcon className="siderbar__voiceIcon" fontSize="large"/>
                <div className="siderbar__voiceInfo">
                    <h3>Voice Connected</h3>
                     <p>Stream</p>
                </div>

                <div className="siderbar__voiceIcons">
                        <InfoOutlinedIcon/>
                        <CallIcon/>
                </div>
            </div>
            <div className="sidebar__profile">
                <Avatar src={user.photo} onClick={()=>auth.signOut()}/>
                <div className="siderbar__profileInfo">
    <h3>{user.displayName}</h3>
    <p>#{user.uid.substring(0,5)}</p>
                </div>

                <div className="siderbar__profileIcons">
                    <MicIcon/>
                    <HeadsetIcon/>
                    <SettingsIcon/>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
