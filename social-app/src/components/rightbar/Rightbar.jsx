import React from 'react'
import "./rightbar.css"
import OnlineFriend from './OnlineFriend'


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
                    { [1,2,3,4,5].map((i)=>{
                            return <OnlineFriend key={i} />
                        })
                    }  
                </div>
                
            </div>
        </div>
    )
}