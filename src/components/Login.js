import React, { useEffect } from 'react'
import GoogleLogin from 'react-google-login'
import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import shareVideo from '../assets/img/share.mp4'
import logo from '../assets/img/logo.png'
import { useUserContext } from '../context/UserContext'
import axios from 'axios'
import UserApi from '../api/UserApi'
import { Categories } from '../api/BlogApi'

// import { client } from '../container/client'

const Login = () => {
    const { users, darkTheme, likes } = useUserContext()
    
    const navigate = useNavigate()
    const responseGoogle = (response) => {
        console.log(response);
        const userDatabase = response.profileObj
        userDatabase["darkTheme"] = darkTheme
        userDatabase["my-favorites"] = likes
        // Lưu vào localStorage
        
        localStorage.setItem('user', JSON.stringify(response.profileObj))

        //Luu vao mongodb
        if(users.every((user) => user.googleId !== userDatabase.googleId)) {
            axios({
                method: 'post',
                url: `http://localhost:8080/api/user-post`,
                data: userDatabase,
            });
        }
        //Lấy data từ profile
        //Sanity user
        navigate('/',{replace: true})
    }
   return (
    <div className='flex justify-start items-center flex-col h-screen'>
        <div className='relative w-full h-full'>
            <video 
                src={shareVideo}
                type="video/mp4"
                loop
                autoPlay
                muted
                controls={false}
                className="w-full h-full object-cover"
            ></video>
            <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
                <div className='p-5'>
                    <img src={logo} width="130px" alt="logo" />
                </div>
                <div>
                    <GoogleLogin 
                        clientId="603009241316-o4qa6g7uup5up6ncofk9fm6tvip9olq3.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <button type="button" 
                                className='flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none bg-slate-50'
                                onClick={renderProps.onClick}   
                                disabled={renderProps.disabled} 
                            >
                                <FcGoogle  className='mr-4' /> Sign in with Google
                            </button>
                        )}
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />
                </div>
            </div>
        </div>
    </div> 
  )
}

export default Login