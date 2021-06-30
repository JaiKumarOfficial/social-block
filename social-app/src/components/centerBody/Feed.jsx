import React from "react"
import "./feed.css"
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useState } from "react";

const Feed = () => {

    const [likeCtr, setLikeCtr] = useState(45)
    const [commentCtr, setCommentCtr] = useState(10)
    const [isLiked, setIsLike] = useState(false)
    const handleLike = () => {
        setLikeCtr(isLiked ? likeCtr - 1: likeCtr + 1)
        setIsLike(!isLiked)
    }
    return(
        <div className="feed-container">
            <div className="feed-top"></div>
            <div className="feed-center">
                <img
                    src='/images/image.jpg'
                    alt="feed"
                    className="feed-center-img"
                />
            </div>
            <div className="feed-bottom">
                <div className="feed-bottom-top">
                    <div className="feed-user">
                        <img src="/images/image.jpg" alt="jai" className="feed-userImg" />
                        <span className="feed-userName">Jai Kumar</span>
                        <span className="feed-userId">jaikumar11</span>
                    </div>
                    <div className="feed-picOptions">
                        <div className="feed-opContainer">
                            <span className="feed-like-conter">{likeCtr}</span>
                            <button className='feed-option-btn' onClick={handleLike}>
                                {
                                    isLiked
                                    ? 
                                    <FavoriteIcon className='likeIcon' htmlColor='red'/>
                                    :
                                    <FavoriteBorderIcon className='likeIcon' htmlColor='red'/>
                                }
                            </button>
                        </div>
                        <div className="feed-opContainer">
                            <span className="feed-comment-counter">{commentCtr}</span>
                            <button className="feed-option-btn">
                                <ChatBubbleOutlineIcon />
                            </button>
                        </div>
                        <MoreHorizIcon />
                    </div>
                </div>
                <p className="feed-caption">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Fugit ut perspiciatis numquam officia nesciunt minus in 
                    laboriosam ducimus maiores, soluta laborum molestiae voluptas
                    modi quis illum ad nobis esse tenetur.
                </p>
                <span className="feed-timestamp">21 mins ago</span>
            </div>
        </div>
    )
}
export default Feed