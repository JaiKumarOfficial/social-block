import "./sharePost.css"
import React from 'react'
import {user} from '../../data'
import Button from '@material-ui/core/Button';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import LabelIcon from '@material-ui/icons/Label';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import { useState } from "react";

const SharePost = ({profilePic}) => {

    const [input, setInput] = useState('')

    const handleChange = (e) => {
        setInput(e.target.value)
    }

    return(
        <div className="sharePost">
            <div className="sharePost-top">
                <img
                    src={profilePic}
                    alt="profile pic"
                    className="sharePost-img"
                />
                <textarea className="sharePost-input"
                name="feedPost" 
                id="feedPost" 
                cols="30" 
                rows="3" 
                placeholder={`What's in your mind ${user.fname}?`} 
                value={input}
                onChange={handleChange}
                ></textarea>
            </div>
            <hr className="sharePost-hr"/>
            <div className="sharePost-bottom">
                <div className='sharePost-bottom-left'>
                    <div className="sharePost-bottom-option">
                        <label className="sharePost-label">
                            <PhotoLibraryIcon className='photoIcon' />
                            <span>Media</span>
                            <input type="file" hidden />
                        </label>
                    </div>
                    <div className="sharePost-bottom-option">
                        <LabelIcon className='tagIcon'/> Tag
                    </div>
                    <div className="sharePost-bottom-option">
                        <LocationOnIcon className='locationIcon'/> Location
                    </div>
                    <div className="sharePost-bottom-option">
                        <EmojiEmotionsIcon className='emojiIcon'/> Feelings
                    </div>
                </div>
                <div>
                    <Button 
                        size="small"
                        variant="contained"
                        className='sharePost-share-btn'
                    >Share</Button>
                </div>
            </div>
        </div>
    )
}

export default SharePost