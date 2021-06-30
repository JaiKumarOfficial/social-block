import React from 'react'
import "./centerBody.css"
import SharePost from './SharePost'
import Feeds from "./Feeds"

export default function CenterBody({profilePic, renderShare}) {
    return(
        <div className="centerBody">
            <div className="centerBody-container">
                {renderShare && <SharePost profilePic={profilePic}/>}
                <Feeds />
                {/* share post component */}
                {/* feed components */}
            </div>
        </div>
    )
}