import React from  'react'


export default function OnlineFriend () {
    return (
        <div className="onlineFriend">
            <div className="onlineImg">
                <img
                    src="/images/image.jpg"
                    alt="name"
                    className="frndImg"
                />
                <div className="onlineDot"></div>
            </div>
            <a href="/kunalarora" className="frndLink">
                <span className="frndName">Kunal Arora</span>
            </a>
        </div>)
}