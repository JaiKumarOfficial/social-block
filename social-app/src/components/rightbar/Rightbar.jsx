import React from 'react'
import "./rightbar.css"
import OnlineFriend from './OnlineFriend'
import {onlineFriends} from "../../data"

export default function rightbar() {

    // const onlineFriends = () => {
    //     return (<div className="onlineFriend">
    //         <div className="onlineImg">
    //             <img
    //                 src="/images/image.jpg"
    //                 alt="name"
    //                 className="frndImg"
    //             />
    //             <div className="onlineDot"></div>
    //         </div>
    //         <a href="/kunalarora" className="frndLink">
    //             <span className="frndName">Kunal Arora</span>
    //         </a>
    //     </div>)
    // }

    return(
        <div className="rightbar">
            <div className="rightbar-eventContainer">
                <img
                    src="/images/gift.png"
                    alt="giftbox"
                    className="giftboxImg"
                />
                <div className="eventBanner">
                    <span className="bdayBanner">
                        Keshav Singla
                    </span> and
                    <span className="bdayBanner"> 3 others </span>
                    have Birthday Today!
                </div>
            </div>
            <div className="rightbar-friendsContainer">
                <h3>Online Friends</h3>
                <div className="onlineFriendList">
                    { onlineFriends.map((frnd)=>{
                            return <OnlineFriend key={frnd.id} frnd={frnd} />
                        })
                    }  
                </div>
                
            </div>
        </div>
    )
}