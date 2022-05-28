import axios from 'axios'
import React, { useEffect, useState } from 'react'


// const BlogApi = () => {
//     var data
//     axios.get('http://localhost:8080/api/blog')
//     .then((response) => {
//         data = response.data 
//         // return data
//     })
//     .catch(() => {
//         return 'Error retrieving data!!!';
//     });
//     return data
// }

// export default BlogApi



const URL = 'http://localhost:8080/api/blog'

const BlogApi = async () => {
    try {
        const data = await axios.get(URL)
       
        return data
    } catch(error) {
        console.log(error);
    }
}
const URLCategory = 'http://localhost:8080/api/categories'

export const Categories = async () => {
    try {
        const data = await axios.get(URLCategory)
       
        return data
    } catch(error) {
        console.log(error);
    }
}
export default BlogApi;
