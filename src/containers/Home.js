import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import Model from './Model'
import Pins from './Pins'

const Home = () => {
  const [isModel, setIsModel] = useState(false)

  const [category, setCategory] = useState()
  // const darkTheme = JSON.parse(localStorage.getItem('darkTheme'))
  // console.log(darkTheme);
  
  return (
    <div className='flex'>
        <Sidebar setIsModel={setIsModel} category={category} setCategory={setCategory}/>
        <Pins category={category} />
        {isModel && <Model isModel={isModel} setIsModel={setIsModel} />}
    </div>
  )
}

export default Home