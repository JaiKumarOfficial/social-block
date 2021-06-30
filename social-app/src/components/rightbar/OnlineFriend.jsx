import React from  'react'


export default function OnlineFriend ({frnd}) {
    return (
        <div className="onlineFriend">
            <div className="onlineImg">
                <img
                    src={frnd.profilePic}
                    alt={frnd.name}
                    className="frndImg"
                />
                <div className="onlineDot"></div>
            </div>
            <a href="/kunalarora" className="frndLink">
                <span className="frndName">{frnd.name}</span>
            </a>
        </div>)
}