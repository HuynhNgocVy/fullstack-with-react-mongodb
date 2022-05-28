import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'
import BlogApi from '../api/BlogApi'
import { BsFillHeartFill } from 'react-icons/bs'
import { FaComment } from 'react-icons/fa'
import { FcDownload } from 'react-icons/fc'
import UserApi from '../api/UserApi'
import { saveAs } from 'file-saver'
import { useUserContext } from '../context/UserContext'

const Feed = (props) => {  
  const breakpointColumnsObj = {
    default: 5,
    1300:4,
    1100: 3,
    700: 2,
    500: 1
  };
  const { likes } = useUserContext()
  const like = (favorite) => {
    favorite["like"] = true;
    console.log((favorite));
    props.setLikes(pre => pre.concat(favorite))
  }
  const dislike = (favorite) => {
    favorite["like"] = false;
    props.setLikes(pre => {
      return pre.filter(meetup => meetup._id !== favorite._id)
  })
  }
  const handleFavorites = (favorite) => {
    if(favorite.like) {
      dislike(favorite)
    } else {
      like(favorite)
    }

  }
  const handleDownload = (blog) => {
    console.log(blog.image.srcObject);
    console.log(URL.createObjectURL(blog.image));
    // saveAs(blog.image, 'image.jpg')
  }

  return (
    <div className={props.darkTheme ? '':' darkFeed text' }>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
      {props.blogArray?.map((blog) => (
        <div className='w-44' key={blog._id} >
          <div className='flex items-center mb-2 cursor-pointer'>
            <img className='w-8 h-8 mr-2 rounded-full' src={blog.userImg}/>
            <div className='flex flex-col'>
              <h3 className='text-sm font-medium'>{blog.user}</h3>
              <div className='text-xs text-gray-400' title={blog.published}>{moment(blog.published).startOf('ss').fromNow()}</div>
            </div>
          </div>
          <img className='rounded-3xl cursor-pointer hover:decoration-solid' src={blog.image} /> 
          <p className='text-sm'>{blog.description}</p>
          <div className='flex items-center my-2 cursor-pointer'>
            <BsFillHeartFill size={20} className={likes.some((like) => like._id === blog._id) ? "mr-2 icons-liked":"mr-2 icons"} onClick={() => handleFavorites(blog)}  />
            <FaComment size={20} className="mr-2 icons"/>
            <FcDownload size={20} className="mr-2 icons" onClick={() => handleDownload(blog)}/>
          </div>
        </div>

      ))}
      </Masonry>
    </div>
  )
}

export default Feed

