import React, { useState } from "react"
import "./topbar.css"
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

export default function Topbar( { profilePic, user } ) {
    
    const [hover, setHover] = useState(false)
    const mouseEnter = () => {
        setHover(true)
    }
    const mouseLeave = () => {
        setHover(false)
    }
    const handleSignout = () => {
        localStorage.removeItem('token')
    }

    return(
        <>
        <div className="topbarContainer">
            <div className="topbar-left">
                <a href='/home' style={{textDecoration: "none", color: "inherit"}}>
                <span className="topbar-logo">
                    Social Block
                </span>
                </a>
            </div>

            <div className="topbar-center">
                <SearchIcon className="searchIcon"/>
                <input type="text" className="topbar-search" placeholder="Search posts or friends"/>
            </div>

            <div className="topbar-right">
                {!user ? (<div className="topbar-btn-container">
                    <a href="/">
                        <Button variant="contained" className="topbar-btn">
                            Login
                        </Button>
                    </a>
                    <a href="/">
                        <Button variant="contained" className="topbar-btn">
                            Signin
                        </Button>
                    </a>
                </div>)
                : 
                (<>
                <div className="topbar-links">
                    <a href="/home" >Homepage</a>
                    {/* <a href="/home" >Timeline</a>  */}
                </div>
                <div className="topbar-icons">
                    <div className="topbar-icon">
                        <a href="/profile" className="">
                            <PersonIcon className="topbarIcon"/>
                        </a>
                        <span className="iconBadge personIcon">1</span>
                    </div>
                    <div className="topbar-icon">
                        <a href="#" className="">
                            <ChatIcon className="topbarIcon"/>
                        </a>
                        <span className="iconBadge msgIcon">1</span>
                    </div>
                    <div className="topbar-icon">
                        <a href="#" className="">
                            <NotificationsIcon className="topbarIcon"/>
                        </a>
                        <span className="iconBadge notiIcon">1</span>
                    </div>
                    <div className="profileOptions">
                        <div className="profileImg-container"
                            onMouseEnter={mouseEnter}
                            onMouseLeave={mouseLeave}
                        >
                            <Link to="/profile">
                            <img
                                src={user.profilePic}
                                alt="img"
                                className="profileImg"
                            />
                            </Link>
                        {hover && (<div className="profileHover-container">
                            <div></div>
                            <div className="signout">
                                <a
                                href="/profile"
                                >Profile</a>
                                <a
                                href="#"
                                >Settings</a>
                                <a
                                href="/"
                                onClick={handleSignout}
                                >Logout</a>
                            </div>
                            
                        </div>)}
                    </div>
                    
                    </div>
                </div>
                </>)
                }
            </div>
        </div>
        </>
    )
}