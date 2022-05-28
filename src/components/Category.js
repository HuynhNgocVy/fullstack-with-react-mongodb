import moment from 'moment'
import React, { useEffect, useState } from 'react'
import Masonry from 'react-masonry-css'

const Category = ({darkTheme, category, blogCategory}) => {
  const breakpointColumnsObj = {
    default: 5,
    1300: 4,
    1100: 3,
    700: 2,
    500: 1
  };
  return (
    <div className={darkTheme ? '':' darkFeed text' }>
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >
      {blogCategory?.map((blog) => (
        <div className='w-44' key={blog._id}>
          <img className='rounded-3xl cursor-pointer hover:decoration-solid' src={blog.image} /> 
          <div className='flex items-center mt-2 cursor-pointer'>
            <img className='w-8 h-8 mr-2 rounded-full' src={blog.userImg}/>
            <div className='flex flex-col'>
              <h3 className='text-sm font-medium'>{blog.user}</h3>
              <div className='text-xs text-gray-400' title={blog.published}>{moment(blog.published).startOf('ss').fromNow()}</div>
            </div>
          </div>
          <p className='text-sm'>{blog.description}</p>
        </div>

      ))}
      
      </Masonry>
    </div>
  )
}

export default Category