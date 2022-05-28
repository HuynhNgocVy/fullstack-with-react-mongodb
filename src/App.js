import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Home from './containers/Home'
import UserContextProvider from './context/UserContext'
import { useLocalStorage } from './localStorage/LocalStorage'


const App = () => {  

  return (
    <UserContextProvider>    
      <Routes>
        <Route path="/*" element={<Home />} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </UserContextProvider>
  )
}

export default App