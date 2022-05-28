import axios from "axios";

const URL = 'http://localhost:8080/api/user'

const UserApi = async () => {
    try {
        const data = await axios.get(URL)
       
        return data
    } catch(error) {
        console.log(error);
    }
}
const URLpost = 'http://localhost:8080/api/user-post'

export const MyUserApi = async () => {
    try {
        const data = await axios.get(URLpost)
       
        return data
    } catch(error) {
        console.log(error);
    }
}
export default UserApi
