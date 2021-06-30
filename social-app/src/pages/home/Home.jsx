import React, { useEffect, useState } from "react"
import "./home.css"
import SignUp from "../sign_up/SignUp"
import Topbar from "../../components/topbar/Topbar"
import Leftbar from "../../components/leftbar/Leftbar"
import Rightbar from "../../components/rightbar/Rightbar"
import CenterBody from "../../components/centerBody/CenterBody"
import axios from "axios"
import { useHistory } from "react-router-dom"

export const Home = () => {
    let history = useHistory()
    const [render, setRender] = useState(false)
    const [friendList, setFriendList] = useState([])
    const [userProfilePic, setUserProfilePic] = useState('')

    useEffect(() => {
        console.log('api')
        const token = localStorage.getItem('token') || ""
        if(token){
            axios.get('/home', {
                headers: {"authorization": `Bearer ${token}`}
            })
            .then(res => {
                console.log('res', res.data)
                if(res.data.success){
                    setRender(true)
                    setUserProfilePic(res.data.userProfile.profilePic)
                    setFriendList(res.data.friendList)
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

    return(
        render ? 
        (<>
        {/* <Topbar profilePic={userProfilePic}/> */}
            <div className="home">
                <Leftbar friendList={friendList}/>
                <CenterBody profilePic={userProfilePic} renderShare={true}/>
                <Rightbar />
            </div>
        </>)
        :
        <div></div>
    )
}