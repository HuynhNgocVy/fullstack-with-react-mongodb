import React from 'react'
import { useState, useEffect } from 'react'
import user from '../assets/img/user.png'
import { AiOutlineArrowLeft, AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import {FiSearch, FiUpload} from 'react-icons/fi'
import { BsUmbrellaFill, BsMusicNoteList, BsMusicNote } from 'react-icons/bs'
import { RiHome6Fill, RiBriefcase2Fill } from 'react-icons/ri'
import {MdOutlineFavorite} from 'react-icons/md'
import { BiMessageSquareAdd } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Categories } from '../api/BlogApi'
import { useUserContext } from '../context/UserContext'

const Sidebar = ({ setIsModel, setCategory }) => {

    const {darkTheme, setDarkTheme, likes} = useUserContext()
    const [ isToggle, setIsToggle ] = useState(true)
    // var { email, name, imageUrl }
    const { email, name, imageUrl } = JSON.parse(localStorage.getItem('user')) || {email : "gmail.com", name: "Klew", imageUrl:user}
    // if(JSON.parse(localStorage.getItem('user'))) {

    // }
    const [categories, setCategories] = useState([])
    const [seeMore, setSeeMore] = useState(true)

    useEffect(() => {
        Categories()
        .then((data) => {
            setCategories(data?.data);
          })
    },[])
    
    const categoriesArray = [];
    if(seeMore) {
        categoriesArray.push(categories?.slice(0,3))
    } else {
        categoriesArray.push(categories)
    }

  return (
      <div className={isToggle ?'w-72 h-screen mr-12': 'w-16 h-screen' }>
        <div className={darkTheme ? 'light fixed z-10' : 'dark fixed z-10'}>
            <div className={isToggle ?'w-72 p-5 h-screen overflow-x-hidden': 'w-16 p-2 h-screen overflow-x-hidden relative flex flex-col items-center' }>
                {isToggle &&
                    <div className='flex items-center justify-end p-2 arrow' onClick={() => setIsToggle(!isToggle)}>
                        <AiOutlineArrowLeft />
                    </div>
                }
                <Link to="/login">
                    <div className={isToggle ? 'flex flex-row items-center': 'flex justify-center'}>
                        <div className={isToggle ? 'rounded-full p-1 mr-4 nav__img--container' : 'flex justify-center items-center text-center'}>
                            <img className={isToggle ? 'rounded-full w-12 h-12' : 'rounded-full w-9 h-9'}src={imageUrl} />
                        </div>
                        {isToggle &&
                            <div className='flex flex-col justify-center'>
                                <h2 className='font-semibold text-base'>{name}</h2>
                                <p className='text-sm'>{email.split('@')[0]}</p>
                            </div>
                        }   
                    </div>
                </Link>  
                <div className={isToggle ? 'flex justify-center w-full items-center text-center h-10 border--search p-2 my-6 rounded-full': 'flex justify-center items-center border--search my-6 rounded-full w-9 h-9'} onClick={() => setIsToggle(true)}>
                    <FiSearch size={20} className=""/>
                    {isToggle &&
                        <input type="text"  placeholder='Search' className='ml-3 font-medium text-sm'/>
                    }
                </div>
                <div>
                    <Link to="/" className={isToggle ? 'flex w-full items-end h-10 px-3 border--gradiant p-2 my-4 rounded-full': 'flex justify-center items-center text-center border--gradiant my-4 rounded-full w-9 h-9'}>
                        <RiHome6Fill size={20} />
                        {isToggle &&
                            <p className='text-base font-normal ml-5'>Home</p>
                        }
                    </Link>
                    <Link to='/music' className={isToggle ? 'flex w-full items-end h-10 px-3 border--gradiant p-2 my-4 rounded-full': 'flex justify-center items-center text-center border--gradiant my-4 rounded-full w-9 h-9'}>
                        <BsMusicNoteList size={20} />
                        {isToggle &&
                            <div className='flex items-center justify-between w-full'>
                                <p className='text-base font-normal ml-5'>Music</p>
                                <BsMusicNote size={20} />
                            </div>
                        }
                    </Link>
                    <div className={isToggle ? 'flex w-full items-end h-10 px-3 border--gradiant p-2 my-4 rounded-full': 'flex justify-center items-center text-center border--gradiant my-4 rounded-full w-9 h-9'}>
                        <RiBriefcase2Fill size={20} />
                        {isToggle &&
                            <div className='flex items-center justify-between w-full'>
                                <p className='text-base font-normal ml-5'>Tasks</p>
                                <BiMessageSquareAdd size={20} />
                            </div>
                        }
                    </div>
                    <Link to='/favorite' className={isToggle ? 'flex w-full items-end cursor-pointer h-10 px-3 border--gradiant p-2 my-4 rounded-full': 'flex justify-center items-center text-center border--gradiant my-4 rounded-full w-9 h-9'}>
                        <MdOutlineFavorite size={22} />
                        {isToggle &&
                            <div className='flex items-center justify-between w-full'>
                                <p className='text-base font-normal ml-5'>Favorites</p>
                                <div className='rounded-full dark:bg-slate-600 dark:text-slate-900 bg-slate-200 text-gray-700 w-6 h-6 text-center items-center text-sm font-medium'>{likes.length}</div>
                            </div>
                        }
                    </Link>
                    <div className={isToggle ? 'flex w-full items-end cursor-pointer h-10 px-3 border--gradiant p-2 my-4 rounded-full': 'flex justify-center items-center text-center border--gradiant my-4 rounded-full w-9 h-9'}>
                        <BsUmbrellaFill size={20} />
                        {isToggle &&
                            <div className='flex items-center justify-between w-full'>
                                <p className='text-base font-normal ml-5'>Notifications</p>
                                <div className='rounded-full dark:bg-slate-600 dark:text-slate-900 bg-slate-200 text-gray-700 w-6 h-6 text-center text-sm font-medium'>0</div>
                            </div>
                        }
                    </div>
                </div>
                <div className='my-4 flex flex-col'>
                    <div className='flex justify-between'>
                        <h3 className={isToggle ? 'text-left text-base font-semibold': 'text-sm font-semibold'}>Category</h3>
                        
                        {seeMore ?
                            isToggle && <div className='text-sm flex items-end border-b-2 border-transparent cursor-pointer dark:hover:border-b-2 dark:hover:border-slate-50 hover:border-b-2 hover:border-slate-600' onClick={() => setSeeMore(!seeMore)}> <AiOutlineEye size={18} className="mr-1"/> See more</div> :
                            isToggle && <div className='text-sm flex items-end border-b-2 border-transparent cursor-pointer dark:hover:border-b-2 dark:hover:border-slate-50 hover:border-b-2 hover:border-slate-600' onClick={() => setSeeMore(!seeMore)}> <AiOutlineEyeInvisible size={18} className="mr-1"/> Hide</div>
                        }
                    </div>
                    <div className='flex flex-col items-center justify-center'>
                        {categoriesArray[0]?.map((category, index) => (
                            <Link to={category?.category} 
                                className={isToggle ? 'flex w-full items-center h-10 px-3 border--gradiant p-2 my-2 rounded-full': 'flex items-center justify-center border--gradiant my-2 rounded-full w-9 h-9'}
                                onClick={() => setCategory(category?.category)}
                            >
                                <div key={index} className="flex">
                                    <img className='w-8 h-8 rounded-full object-cover' src={category?.imgUrl} />
                                    {isToggle &&
                                        <p className='text-base font-normal ml-5'>{category?.category}</p>
                                    }
                                </div>
                            </Link>

                        ))}
                    </div>
                </div>
                <div className={darkTheme ?'bg-slate-50 border-2 border-slate-500 border-dashed p-3 rounded-lg' : 'upload__container'}>
                    <div 
                        className='flex flex-col justify-center cursor-pointer items-center'
                        onClick={() => setIsModel(true)}
                    >
                        <FiUpload size={isToggle ? 30:20} className="text-blue-600 my-3"/>
                        {isToggle &&
                            <p className='text-sm font-semibold'>Drag-n-Drop to Upload</p>
                        }
                    </div>
                </div>
                <div>
                    <button type="button" className='text-sm font-semibold my-10 bg-blue-200 dark:bg-gray-800 dark:text-gray-100 border rounded-full px-4 py-2 hover:shadow-lg'
                    onClick={() => setDarkTheme(!darkTheme)}
                    >
                    {isToggle ? 
                        darkTheme ? "Light 💡": "Dark 🌙":
                        darkTheme ? "💡": "🌙"
                    }
                    </button>
                </div>
            </div>
        
        </div>
      </div>
  )
}

export default Sidebar