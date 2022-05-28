import React from 'react'
import UpLoad from '../components/UpLoad'

const Model = ({setIsModel}) => {
  return (
    <div className='model__container'>
      <UpLoad setIsModel={setIsModel} />
    </div>
  )
}

export default Model