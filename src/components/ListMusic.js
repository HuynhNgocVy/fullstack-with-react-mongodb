import { BiPlanet } from 'react-icons/bi'
import { useState, useEffect, useRef } from 'react'
import { FcReddit } from 'react-icons/fc'
import axios from 'axios'
function ListMusic({darkTheme, audioID, setAudioID, musics, setMusics, setIndex}) {
    const audioElement = useRef()
    useEffect(() => {
        getMusicVietNam()
    }, [])
    const getMusicVietNam = () => {
        axios.get('http://localhost:8080/api/music/vietnamese')
            .then((response) => {
                const data = response.data;
                setMusics(data);
            })
            .catch(() => {
                alert('Error retrieving data!!!');
            });
    }
    return (
        <div className={darkTheme ? 'md:w-2/3' : 'md:w-2/3'}>
            <h2 className='flex text-lg font-bold mx-10'>Mostly Played </h2>
            <div className='scroll__overflow overflow-auto' style={{height: "350px"}}>
                {musics.map((music, index) => 
                    (<div className='m-4' key={music.id} onClick={() => setAudioID(music)}>
                        <div 
                            onClick={() => setIndex(index)}
                            className={audioID?._id===music?._id ? "m-auto cursor-pointer flex justify-between items-center text-center p-2 rounded-lg dark:bg-slate-400 bg-stone-500": "m-auto cursor-pointer flex justify-between items-center text-center p-2 rounded-lg  dark:bg-slate-50 bg-stone-200 ease-in-out duration-500 hover:translate-x-4"}  style={{width: "80%"}}>
                            <div className='flex text-center items-center md:w-1/2'>
                                <h2 className='mx-4 text-base font-bold text-slate-900'>
                                    {index + 1}.</h2>
                                <img className='w-10 rounded-xl' src={music.image}/>
                                <h2 className='mx-4 text-base font-semibold text-slate-900'>{music.name}</h2>
                            </div>
                            <div className='md:text-xs md:text-slate-900 hidden md:flex'>
                                {music.singer}
                            </div>
                            <div className='text-slate-900'>
                                {}
                            </div>
                            <div className='text-xl items-center mx-4 text-slate-900'>
                                <BiPlanet />
                            </div>
                            <audio ref={audioElement} src={music.path}></audio>
                        </div>
                    </div>)
                    )
                }
            </div>
           
        </div>
    )
}
export default ListMusic