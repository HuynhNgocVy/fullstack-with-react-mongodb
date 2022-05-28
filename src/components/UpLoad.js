import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BsCloudUpload } from 'react-icons/bs'
import { FaRegImages } from 'react-icons/fa'
import { Categories } from '../api/BlogApi'
import { useLocalStorage } from '../localStorage/LocalStorage'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const UpLoad = ({ setIsModel }) => {
    const navigate = useNavigate()
    const [file, setFile] = useState("")
    const [options, setOptions] = useState([])
    const [categoryChange, setCategoryChange] = useState("")
    const [desc, setDescChange] = useState("")
    const handleUpload = (e) => {
        
        Array.from(e.target.files).forEach((file) => {
            if (!file.type.startsWith("image/")) {
                return;
            }

            const reader = new FileReader();
            reader.onload = (event) => {
                console.log(e.target.files[0]);
                const fileObj = {
                    name: e.target.files[0].name,
                    fileData: event.target.result
                }
                setFile(fileObj);
            }
            reader.readAsDataURL(e.target.files[0]);
        })
        // const file = e.target.files[0]
        // if(file.type === 'image/png' || file.type === 'image/svg' || file.type === 'image/jpeg' || file.type === 'image/gif') {
            
        // }
        // file.preview = URL.createObjectURL(file)
        // setFile(file.preview)
    }
    useEffect(() => {
        return () => {
            file && URL.revokeObjectURL(file)
        }
    }, [file])
    useEffect(() => {
        Categories()
        .then((data) => {
            setOptions(data?.data)
        })
    },[])

    const handleSubmit = () => {
        const dataUpload = {
            category: categoryChange,
            description: desc,
            user:  JSON.parse(localStorage.getItem('user')).name,
            userImg: JSON.parse(localStorage.getItem('user')).imageUrl,
            image: file.fileData,
            published: new Date()
        }
        axios({
            method: 'post',
            url: 'http://localhost:8080/api/blogPost',
            data: dataUpload,
        });
        // setFile("")
        // setCategoryChange()
        // setDescChange("")
        window.location.href = "http://localhost:3000/";
    }

  return (
    <div className='uploadEle__container scale-up-ver-top'>
        <div className='flex items-center justify-end pt-3 pb-1 px-5'>
            <IoMdClose size={20} className='' onClick={() => setIsModel(false)}/>
        </div>
        <div className="flex flex-col justify-center text-center mt-2 mb-4">
            <h3 className='text-lg font-semibold'>UpLoad your Image</h3>
            <p className="text-base">PNG, JPG and GIF files are allowed</p>
        </div>
        <div>
            <div className='border-2 border-dashed rounded-xl text-center justify-center items-center my-5 mx-4 pt-8 pb-3 px-4 input-file'>
                <label htmlFor="upload" >
                    <div className='flex justify-center mb-5'>
                        <BsCloudUpload size={50} className="text-slate-700"/>
                    </div>    
                    <p className='text-slate-500 text-sm'>Drag and drop or browse to choose a file</p>
                </label>
                {file && <p className='flex text-left items-end text-slate-400 text-sm'><FaRegImages size={15} className='mr-1'/>{file.name.length > 35 ? file.name.slice(0,35) + ' ...': file.name}</p>}
            </div>
            <input type="file" onChange={handleUpload} id='upload' import hidden/>
        </div>
        <div className="mx-4">
            <label for="category" className="text-base">Category:</label>
            <select name="category" id="category" className="text-sm ml-3 py-1 px-2 rounded-lg" onChange={(e) => setCategoryChange(e.target.value)} import>
                <option>Choose a category</option>
                {options.map((option, index) => (
                    <option value={option.category} key={index}
                    >{option.category}</option>
                ))}
                
            </select>
            <div className='flex flex-col'>
                <label for="desc" className="text-base">Description:</label>
                <textarea className="text-sm rounded-lg" onChange={(e) => setDescChange(e.target.value)} ></textarea>
            </div>
            <div className='flex justify-center m-3'>
                <button className='bg-slate-400 text-sm px-12 py-1 rounded-md' type='submit' onClick={handleSubmit}>Upload</button>
            </div>
        </div>
        </div>
  )
}

export default UpLoad