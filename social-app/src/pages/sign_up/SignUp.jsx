import "./signUp.css"
import React, { useEffect } from "react"
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useState } from "react";
import axios from "axios"
import { useHistory } from "react-router-dom"


const SignUp = () => {
    let history = useHistory()

    const [render, setRender] = useState(false)
    const [signUp, setSignUp] = useState(true)

    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [fnameError, setFnameError] = useState("")
    const [lnameError, setLnameError] = useState("")
    const [emailError, setEmailError] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(token) {
            history.push('/home')
        }
        else setRender(true)
    }, [])

    const handleChange = (event) => {
        const value = event.target.value
        let name = event.target.name

        if(name === 'fname') {
            setFname(value.trim())
            value.trim().length ? setFnameError("") : setFnameError('Required')
        }
        if(name === 'lname') {
            setLname(value.trim())
            value.trim().length ? setLnameError("") : setLnameError('Required')
        }
        if(name === 'email') {
            setEmail(value.trim())
            value.trim().length ? setEmailError("") : setEmailError('Required')
        }
        if(name === 'password') {
            setPassword(value)
            value.length ? setPasswordError("") : setPasswordError('Required')
        }
        if(name === 'confirmPassword') {
            setConfirmPassword(value)
            value.length ? setConfirmPasswordError("") : setConfirmPasswordError('Required')
            if(value !== password) {
                setConfirmPasswordError('Password does not match')
            }
        }
    }

    const handleLogin = () => {
        setSignUp(!signUp)
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setFnameError("")
        setLnameError("")
        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(e.nativeEvent.submitter.name === 'signup') {
            if(!fname) setFnameError('Required')
            if(!lname) setLnameError('Required')
            if(!email) setEmailError('Required')
            if(!password) setPasswordError('Required')
            if(!confirmPassword) setConfirmPasswordError('Required')
            if(
                fname && 
                lname &&
                email &&
                password && (password === confirmPassword)
            ){
                axios.post(
                    '/signup',
                    {
                        fname: fname,
                        lname: lname,
                        email: email,
                        password: password,
                    }
                ).then((res) => {
                    console.log(res)
                    if (res.status === 201 && res.data.msg === 'created') {
                        // set jwt
                        localStorage.setItem('token', res.data.token)
                        window.location.href = "/home"
                    }
                    else {
                        console.log(res.data.errors)
                        res.data.errors.map(error => {
                            if(error.param === 'email') {
                                setEmailError(error.msg)
                            }
                            if(error.param === 'password') {
                                setPasswordError(error.msg)
                            }
                        })
                    } 
                })
                .catch((err) => console.log(err))
            }
        }
        else {
            if(!email) setEmailError('Required')
            if(!password) setPasswordError('Required')
            if(email && password) {
                axios.post(
                    '/login',
                    {
                        email: email,
                        password: password
                    }
                )
                .then(res => {
                    console.log('res', res)
                    if(res.data.msg === 'error'){
                        const {errors} = res.data;
                        errors.map(error => {
                            if(error.param === 'email') {
                                setEmailError(error.msg)
                            }
                            if(error.param === 'password'){
                                setPasswordError(error.msg)
                            }
                        })
                    }
                    if(res.data.msg === 'authenticated'){
                        // store token
                        localStorage.setItem('token', res.data.token)
                        window.location.href="/home"
                    }
                })
                .catch(err => {
                    console.log('err',err)
                })
            }
        }
        
    }

    const signUpForm = () => {
        return (
            <div className="signUp-container">
                <form onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-basic"
                        name="fname"
                        label="First Name"
                        variant="outlined"
                        className="signUp-input"
                        error={fnameError ? true : false}
                        helperText={fnameError}
                        onChange={handleChange}
                        value={fname}
                         
                    />
                    <TextField
                        id="outlined-basic" 
                        name="lname"
                        label="Last Name"
                        variant="outlined"
                        error={lnameError ? true : false}
                        helperText={lnameError}
                        onChange={handleChange}
                        value={lname}    
                    />
                    <TextField
                        id="outlined-basic" 
                        name="email"
                        label="Email"
                        variant="outlined"
                        error={emailError ? true : false}
                        helperText={emailError}
                        onChange={handleChange}
                        value={email}    
                    />
                    <TextField
                        id="outlined-basic" 
                        name="password"
                        label="Password"
                        type="password"
                        variant="outlined"
                        error={passwordError ? true : false}
                        helperText={passwordError}
                        onChange={handleChange}
                        value={password}    
                    />
                    <TextField
                        id="outlined-basic"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        variant="outlined"
                        error={confirmPasswordError ? true : false}
                        helperText={confirmPasswordError}
                        onChange={handleChange}
                        value={confirmPassword}    
                    />
                    <Button
                        variant="contained"
                        className="signUp-btn"
                        type="submit"
                        name="signup"
                    >
                        Sign Up
                    </Button>
                </form>
                    
            <div className="login-link">
                <h3>Already have an account ?</h3>
                    <Button
                        variant="contained"
                        className="login-btn"
                        type="submit"
                        onClick={handleLogin}
                    >
                        Log In
                    </Button>
                </div>
            </div>
        )
    }

    const loginForm = () => {
        return(
            <div className="signUp-container">
                <form onSubmit={handleSubmit}>
                    <TextField
                            id="outlined-basic" 
                            label="Email"
                            name="email"
                            variant="outlined"
                            onChange={handleChange}  
                            value={email}
                            error={emailError ? true : false}
                            helperText={emailError}
                        />
                        <TextField
                            id="outlined-basic" 
                            label="Password"
                            name="password"
                            type="password"
                            variant="outlined"
                            onChange={handleChange}
                            value={password}
                            error={passwordError ? true : false}
                            helperText={passwordError}
                        />
                        <Button
                            variant="contained"
                            className="login-btn-1"
                            name="login"
                            type='submit'
                        >
                            Login
                        </Button>
                </form>
                <a
                    href="/recover/password"
                    className="forget-password"
                >Forget Password ?</a>
                <div className="login-link">
                    <h3 style={{color:"grey"}}>Join Social Block Today!</h3>
                    <Button
                        variant="contained"
                        className="signUp-btn-1"
                        onClick={handleLogin}
                    >
                        Sign Up
                    </Button>
                </div>
            </div>
        )
    }
    return (
        render && 
        (<div className="signUp">
            <div className="signUp-left">
                <h1 className="SignUp-logo">
                    Social Block
                </h1>
            </div>
            <div className="signUp-right">
                {signUp ? signUpForm() : loginForm()}
            </div>
        </div>)
    )
}
export default SignUp