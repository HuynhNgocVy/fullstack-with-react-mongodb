import TopArt from "../components/TopArt"
import ListMusic from "../components/ListMusic"
import MusicPlay from "../components/MusicPlay"
import { useState, useRef, memo } from 'react'
import { useLocalStorage } from "../localStorage/LocalStorage"
function Music({ darkTheme }) {
//     // const [idMusic, setIdMusics] = useState(1)
    
//     // console.log(musics[Object.keys(musics)[3]]);
//     // style={{ }}
    // const [typeSong, setTypeSong] = useState("vietnamese")
    const [index, setIndex] = useState(1)
    const [musics, setMusics] = useState([]) 
    // const [audioID, setAudioID] = useLocalStorage("music",musics[Object.keys(musics)[1]])
    // const [dataUser, setDataUser] = useState({})
    const [audioID, setAudioID] = useState(musics[Object.keys(musics)[1]])
    return (
        <div >
           <TopArt />
           <div className="flex px-10 md:justify-between w-full md:flex-row flex-col justify-center">
                <MusicPlay darkTheme={darkTheme} audioID={audioID} setAudioID={setAudioID} musics={musics} index={index} setIndex={setIndex}  />
                <ListMusic darkTheme={darkTheme} audioID={audioID} setAudioID={setAudioID} musics={musics} setMusics={setMusics} setIndex={setIndex} />
           </div>
        </div>
    )
}
export default memo(Music)