import "./feeds.css"
import React from "react"
import Feed from "./Feed"

const Feeds = ()  => {

    const feedFromDb = [1,2,3,4]

    const feeds = () => {
        return feedFromDb.map((i) => {
            return <Feed key={i}/>
        })
    }

    return(
        <div className="feeds-container">
            {feeds()}
        </div>
    )
}
export default Feeds