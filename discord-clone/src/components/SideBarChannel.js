import React from 'react'
import '../assets/siderbarChannel.css';
import {useDispatch} from 'react-redux'
import {setChannelInfo} from  '../features/appSlice';
function SideBarChannel({id,channel}) {
    const dispatch = useDispatch();
    console.log(channel);
    return (
        <div className="siderbar__channel" onClick={()=> dispatch(setChannelInfo({
            channelId:id,
            channelName:channel
        }))}>
            <h4><span className="siderbarChannel__hash">#</span>{channel}</h4>
        </div>
    )
}

export default SideBarChannel
