import { FaRandom } from 'react-icons/fa'
import { GrChapterPrevious,GrChapterNext } from 'react-icons/gr'
import { MdOutlinePause } from 'react-icons/md'
import { BsPlay } from 'react-icons/bs'
import { FiRepeat } from 'react-icons/fi'
import { useState, useEffect, useRef, useLayoutEffect, memo} from 'react'

function MusicPlay({darkTheme, audioID,musics, setAudioID, index, setIndex}) {
    const audio = useRef()
    const [play,setPlay] = useState(false)
    const [progressValue, setProgressValue] = useState(0)

    const cdThumbAnimate = useRef();
    const progressRef = useRef()
    const handlePlay = function() {
        setPlay(!play)
    }
    useEffect(() => {
        audio.current = new Audio(audioID?.path)
        if(audioID?.path){
            if(play) {
                audio.current.play()
                cdThumbAnimate.current.play()
            }
        }
        if(audio?.current) {
            audio.current.ontimeupdate = function() {
                    const progressHi = Math.floor(audio.current.currentTime/audio.current.duration * 100)
                    setProgressValue(progressHi)
            }
            audio.current.onended = function() {
                setAudioID(musics[index+1])
                setIndex(index+1)
            }
        }
        return () => {
            audio.current.pause() 
        }
    }, [play, audioID])

    const cdThumb = document.querySelector(".cd-thumb")
    if(cdThumb)
    {
        cdThumbAnimate.current = cdThumb.animate([
            { transform: 'rotate(360deg)' },
        ], {
            duration: 20000,
            iterations: Infinity
        });
        cdThumbAnimate.current.pause()

    }
  
    const handleProgressValue = (e) => {
        const seakTime = (audio.current.duration*(e.target.value))/100
        audio.current.currentTime = seakTime
        progressRef.current.value = e.target.value
    }
    const handlePrevious = () => {
        if(audioID){
            const previousIndex = index - 1
            setAudioID(musics[previousIndex])
            setIndex(previousIndex)
        }
    }
    const handleNext = () => {
        if(audioID) {
            const nextIndex = index + 1
            setAudioID(musics[nextIndex])
            setIndex(nextIndex)
        }
    }
    return (
        <div className={darkTheme? '' : ''} style={{width: "400px"}}>
            <h2 className='text-lg font-bold mb-5'>Now Playing</h2>
           
                <div className="dark:bg-slate-50 bg-stone-100 rounded-3xl p-6" key={audioID?.id}>
                    <p className="flex justify-end mb-4 text-slate-900">Next- <b>{}</b></p>
                    <div className="flex">
                        <div className="m-auto text-center">
                            <img className="cd-thumb rounded-full m-auto shadow-xl h-36" src={audioID?.image}/>
                            <h3 className="text-base font-bold m-3 text-slate-900">{audioID?.name}</h3>
                            <p className="text-sm text-slate-900">{audioID?.singer}</p>
                        </div>
                    </div>
                    <input id="progress" ref={progressRef} className="w-full" type="range" value={progressValue} step="1" min="0" max="100"
                        style={{height: "5px",outline:"none"}}
                        onChange={handleProgressValue}
                    >
                    </input>
                    <div className='flex justify-between text-center items-center m-2'>
                        <div className='btn m-2'> <FaRandom /> </div>
                        <div className='flex items-center'>
                            <div className='btn m-2' 
                                onClick={handlePrevious}
                            > <GrChapterPrevious /> </div>
                            <div className='rounded-full m-3' style={{backgroundImage: "linear-gradient(45deg,#576ed3,#c06caa)" }}>
                                <div className='btn m-2 bg-slate-50 p-1 rounded-full text-slate-600' onClick={handlePlay}> 
                                    {play ? <MdOutlinePause className='text-xl'/> : <BsPlay className='text-xl'/>}
                                </div> 
                            </div>
                            <div className='btn m-2'
                                onClick={handleNext}
                            > <GrChapterNext /> </div> 
                        </div>
                        <div className='btn m-2'> <FiRepeat /> </div>
                    </div>
                </div>
            
        </div>
    )
}
export default memo(MusicPlay)