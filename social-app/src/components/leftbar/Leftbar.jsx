import React, { useEffect } from 'react'
import axios from "axios"
import "./leftbar.css"
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ChatIcon from '@material-ui/icons/Chat';
import VideocamIcon from '@material-ui/icons/Videocam';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import WorkIcon from '@material-ui/icons/Work';
import EventIcon from '@material-ui/icons/Event';

import {friends, listItems} from "../../data"

export default function Leftbar({friendList}) {
    const list = () => {        
        const itemIcon = (item) => {
            if (item === 'Feed') return <RssFeedIcon />;
            if (item === 'Chat') return <ChatIcon />;
            if (item === 'Video') return <VideocamIcon />;
            if (item === 'Event') return <EventIcon />;
            if (item === 'Job') return <WorkIcon />;
            if (item === 'Bookmark') return <BookmarkIcon />;
        }
        return listItems.map(item => {
            return(
                <li className="leftbar-item" key={item.item}>
                    <a href="#">
                        {itemIcon(item["item"])} {item.item}
                    </a>
                </li>
            )
        })
    }

    const genFriendList = () => {
        //db call for frnds list
        return friendList.map(frnd => {
            return (
                <li key={frnd._id}>
                    <a href={`/profile/${frnd.username}`} className="leftbar-friend">
                        <img 
                            src={frnd.profilePic}
                            alt={`${frnd.fname} ${frnd.lname}`}
                            className="frndImg" 
                        />
                        <span>{`${frnd.fname} ${frnd.lname}`}</span>
                    </a>
                </li>
            )
        })

    }
    return(
        <div className="leftbar">
            <div className="leftbar-container">
                <ul className="leftbar-items">
                    {list()}
                </ul>
                <hr className="leftbar-hr" />
                <h3>Friend List</h3>
                {friendList.length ? (<ul className="leftbar-friendList">
                    {genFriendList()}
                </ul>) : 
                <h4
                    style={{
                        color: "grey",
                        marginLeft: "10px"
                    }}
                >
                    No Friends :{'('}
                </h4>
                }
            </div>
        </div>
    )
}