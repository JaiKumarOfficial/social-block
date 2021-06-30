import { useParams } from "react-router";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios"
import Topbar from "../../components/topbar/Topbar";
import Leftbar from "../../components/leftbar/Leftbar";
import CenterBody from "../../components/centerBody/CenterBody";

export default function PersonProfile() {
    const {history} = useHistory()
    const {username} = useParams()
    const [render, setRender] = useState(false)
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || ""
    })
    const [userProfile, setUserProfile] = useState()
    const [friendList, setFriendList] = useState()

    useEffect(() => {
        if(token) {
            axios.get(`/profile/${username}`, {
                headers: {"authorization": `Bearer ${token}`}
            })
            .then(res => {
                if(res.data.success){
                    console.log(res)
                    setUserProfile(res.data.userProfile)
                    setFriendList(res.data.friendList)
                    setRender(true)
                }
                else {
                    console.log(res)
                    setRender(false)
                    history.push('/')
                }
            })
            .catch(err => {
                console.log('err', err)
            })
        }
        else {
            history.push('/')
        }

    }, [])

    const genMedia = () => {
        console.log(userProfile)
        let mediaLen = userProfile.media.length < 5 ? userProfile.media.length - 1 : 5
        return userProfile.media.slice(0, mediaLen).map((image, idx) => {
            return <img key={idx} className="mediaImg" src={image} alt="media" />
        })
    }

    return(
        render &&
        (<>
            {/* <Topbar profilePic={userProfile.profilePic}/> */}
            <div className="profile">
                <Leftbar friendList={friendList}/>
                <div className="profileRight">
                    <div className="profileRight-top">
                        <div className="profileRight-top-images">
                            <img
                                src={userProfile.coverPic}
                                alt="cover"
                                className="coverImg"
                            />
                            <div className="profilePic-container">
                                <img
                                    src={userProfile.profilePic}
                                    alt={`${userProfile.fname} ${userProfile.lname}` }
                                    className='profilePic'
                                />
                            </div>
                        </div>
                        <h1 className="profile-userName">{`${userProfile.fname} ${userProfile.lname}`}</h1>
                    </div>
                    <div className="profileRight-down">
                        <CenterBody profilePic={userProfile.profilePic} renderShare={false}/>
                        <div className="profileDownRight">
                            <div className="profileMedia-container">
                                <h1 className="mediaTitle">
                                    Media
                                </h1>
                                <div className="profileMedia">
                                    { genMedia()}

                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>)
    )
}