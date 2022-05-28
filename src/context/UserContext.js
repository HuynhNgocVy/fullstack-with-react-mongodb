import { createContext, useContext, useEffect, useState } from "react";
import UserApi, { MyUserApi } from "../api/UserApi";
import { useLocalStorage } from "../localStorage/LocalStorage";
const User = createContext()
function UserContextProvider({ children }) {
    const [ darkTheme, setDarkTheme ] = useLocalStorage("darkTheme",false)
    const [ likes, setLikes ] = useLocalStorage("likes",[])
    const [users, setUsers] = useState([])

    useEffect(() => {
        UserApi()
          .then((data) => setUsers(data?.data))
          .catch((err) => console.log(err))
      },[])

    useEffect(() => {
        MyUserApi()
        .then((data) => console.log(data))
        .catch((err) => console.log(err))
    },[])
    return (
        <User.Provider
            value={{
                users, setUsers,
                darkTheme, setDarkTheme,
                likes, setLikes
            }}
        >
            { children }
        </User.Provider>
    )
}
export default UserContextProvider

export const useUserContext = () => useContext(User)