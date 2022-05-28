import React, { useEffect, useState } from 'react'
import { Routes , Route} from 'react-router-dom'
import BlogApi from '../api/BlogApi'
import Category from '../components/Category'
import Feed from '../components/Feed'
import { useUserContext } from '../context/UserContext'
import { useLocalStorage } from '../localStorage/LocalStorage'
import Music from './Music'
const Pins = ({ category }) => {
  const { darkTheme, likes, setLikes } = useUserContext()
  const [ blogAll, setBlogAll ] = useState([])
  const [ blogCategory, setBlogCategory ] = useState([])
  // const [ likes, setLikes ] = useLocalStorage("likes",[])


  useEffect(() => {
    BlogApi()
    .then((data) => {
        setBlogAll(data?.data.reverse());
      })
  }, [])
  useEffect(() =>  {
    BlogApi()
    .then((data) => {
        setBlogCategory(data?.data.reverse().filter((item) => item.category ===  category));
      })
  }, [category])
  return (
    <div className={darkTheme ? 'w-full px-10 py-7 pins__container' : 'pins__container darkRight px-10 py-7 w-full'}>
        <Routes>
            <Route path="/*" element={<Feed darkTheme={darkTheme} blogArray={blogAll} likes={likes} setLikes={setLikes}/>} />
            <Route path="/:category" element={<Feed darkTheme={darkTheme} blogArray={blogCategory} likes={likes} setLikes={setLikes}/>} />
            <Route path="/favorite" element={<Feed darkTheme={darkTheme} blogArray={likes} likes={likes} setLikes={setLikes}/>} />
            <Route path="/music" element={<Music darkTheme={darkTheme} />} />
        </Routes>
    </div>
  )
}

export default Pins