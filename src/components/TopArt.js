import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Masonry from 'react-masonry-css'
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi'

const TopArt = () => {
    const [arts, setArts] = useState([])
    useEffect(() => {
        getArts()
    },[])
    const getArts = () => {
        axios.get('http://localhost:8080/api/artists')
            .then((response) => {
                const data = response.data;
                setArts(data);
            })
            .catch(() => {
                alert('Error retrieving data!!!');
            });
    }
    
    return(
        <div className="py-3">
            <div className='flex justify-between'>
            <h1 className="text-lg font-bold">Top Artists</h1>
            <div className='flex'>
                <div className='bg-white mx-1 rounded-md p-2 shadow-2xl text-slate-700'>
                    <BiLeftArrow className='text-xs'/>
                </div>
                <div className='bg-white mx-1 rounded-md p-2 shadow-2xl text-slate-700'>
                    <BiRightArrow className='text-xs'/>
                </div>
            </div>
        </div>
            <div className="my-4 flex">
                {
                    arts.map((art) => 
                        (<div key={art._id} className="mx-4 ">
                            <img className="rounded-xl shadow-2xl w-28 h-28" src={art.image}/>
                            <h2 className="font-bold text-base mt-3 sm:text-sm">{art.singer}</h2>
                        </div>)
                    )
                }
            </div>
        </div>
    )
}

export default TopArt