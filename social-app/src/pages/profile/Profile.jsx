import React, {useState, useEffect} from 'react'
import {useHistory, useParams} from "react-router-dom"
import axios from 'axios'
import "./profile.css"
import Topbar from '../../components/topbar/Topbar'
import Leftbar from '../../components/leftbar/Leftbar'
import CenterBody from '../../components/centerBody/CenterBody'

const Profile = () => {

    let history = useHistory()
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || ""
    })
    const [render, setRender] = useState(false)
    const [friendList, setFriendList] = useState([])
    const [userProfile, setUserProfile] = useState({})

    useEffect(() => {
        // const token = localStorage.getItem('token') || ""
        if(token) {
            axios.get('/home', {
                headers: {"authorization": `Bearer ${token}`}
            })
            .then(res => {
                if(res.data.success){
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
        let mediaLen = userProfile.media.length < 5 ? userProfile.media.length - 1 : 5
        return userProfile.media.slice(0, mediaLen).map((image, idx) => {
            return <img key={idx} className="mediaImg" src={image} alt="media" />
        })
    }

    return (
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
                        <CenterBody profilePic={userProfile.profilePic} renderShare={true}/>
                        <div className="profileDownRight">
                            <div className="profileMedia-container">
                                <h1 className="mediaTitle">
                                    Media
                                </h1>
                                <div className="profileMedia">
                                    { genMedia()}
                                    
                                    {/* <img className="mediaImg" src="/images/cover.jpg" alt="cover" />
                                    <img className="mediaImg" src="/images/cover.jpg" alt="cover" />
                                    <img className="mediaImg" src="/images/cover.jpg" alt="cover" />
                                    <img className="mediaImg" src="/images/cover.jpg" alt="cover" />
                                    <img className="mediaImg" src="/images/cover.jpg" alt="cover" /> */}
                                </div>
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
        </>)
    )
}
export default Profile