import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import IGallery from '../models/gallery'
import { addImageAsync, selectcontent, selectimg, selecttitle, setContent, setTitle } from '../features/gallery/gallerySlice'
import jwtDecode from 'jwt-decode'

const AddImage = () => {
    const dispatch = useAppDispatch()    
    const [image, setImg] = useState<File|undefined>(undefined)
    const title = useAppSelector(selecttitle);
    const content = useAppSelector(selectcontent);
    const token = String(sessionStorage.getItem('token'))
    const navigate = useNavigate()
    const uId = jwtDecode<any>(token)

    const handleSubmit = () => {
        const pic :IGallery = {
            title, content, image,
            id: 0,
            userId: uId.user_id
        }
        dispatch(addImageAsync({pic,token}));
        dispatch(setTitle(""));
        setImg(undefined);
        dispatch(setContent(""));
        navigate('/showGallery/')
    }
    

    return (
        <div
            style={{display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '40%',textAlign:'center',}}>
            <form onSubmit={(e)=>{handleSubmit();e.preventDefault()}}>
                <p>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e)=>dispatch(setTitle(e.currentTarget.value))}
                        required
                    />
                </p>
                <p>
                    <input
                        type="text"
                        placeholder="Content"
                        value={content}
                        onChange={(e)=>dispatch(setContent(e.currentTarget.value))}
                        required
                    />
                </p>
                <p>
                    <input
                        type="file"
                        accept="image/png,image/jpeg"
                        onChange={(e)=> setImg(e.currentTarget.files?.[0])}
                        required
                    />
                </p>
                <button type="submit" className='btn btn-success'>Submit</button>
                <button onClick={()=>navigate('/showGallery')} className="btn btn-danger">Back</button>
            </form>
        </div>
    )
}

export default AddImage