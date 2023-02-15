import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { MY_SERVER } from '../env'
import IGallery from '../models/gallery'
import { delImageAsync, getImageAsync, selectcontent, selectGallery,selectrefresh, selecttitle, setContent, setTitle, updImageAsync } from '../features/gallery/gallerySlice'
import jwtDecode from 'jwt-decode'

const MyGallery = () => {
    const dispath = useAppDispatch()
    const gallery = useAppSelector(selectGallery)
    const refresh = useAppSelector(selectrefresh)
    const title = useAppSelector(selecttitle)
    const content = useAppSelector(selectcontent)
    const [image, setImg] = useState<File|undefined>(undefined)
    const token = String(sessionStorage.getItem('token'))

    useEffect(() => {
        dispath(getImageAsync(token))
    }, [dispath, refresh,token])

    const [isUpdate, setisUpdate] = useState(false)

    const uName = jwtDecode<any>(token)
    return (
        <div style={{display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '40%',textAlign:'center',}}>
            <br/><br/><br/><br/>
            {!isUpdate ?
                gallery.length > 0 ? (gallery?.map((pic1, i) =>
                    <div className="card" style={{ width: "18rem", display: 'inline' }} key={i}>
                        <img src={`${MY_SERVER}${pic1.image}`} style={{ width: '30%' }} alt="img" />
                        <div className="card-body">
                            <h2 className="card-title">{pic1.title}</h2>
                            <h5 className="card-text">{pic1.content}</h5>
                            <button className="btn btn-warning" onClick={() => setisUpdate(true)}>Update</button><button className="btn btn-danger" onClick={() => dispath(delImageAsync({ "id": pic1.id, token }))}>Delete</button>
                        </div>
                    </div>)) :
                    <div>
                        <h3>No Pictures yet<br />Please add one!</h3>
                    </div> :
                gallery?.map((pic1, i) =>
                    <div className="card" style={{ width: "18rem", display: 'inline' }} key={i}>
                        <div className="card-body">
                            <p><input
                                type="file"
                                accept="image/png,image/jpeg"
                                onChange={(e) => setImg(e.currentTarget.files?.[0])}
                                required />
                            </p>
                            <p>
                                <input
                                    type="text"
                                    placeholder="Title"
                                    value={title}
                                    onChange={(e) => dispath(setTitle(e.currentTarget.value))}
                                    required />
                            </p>
                            <p>
                                <input
                                    type="text"
                                    placeholder="Content"
                                    value={content}
                                    onChange={(e) => dispath(setContent(e.currentTarget.value))}
                                    required />
                            </p>
                            <button className="btn btn-warning" onClick={() => { const pic: IGallery = { title, content, image, "id": pic1.id,userId:uName.user_id}; dispath(updImageAsync({ pic, token })); setisUpdate(false) }}>Submit</button><button className="btn btn-danger" onClick={() => setisUpdate(false)}>Cancel</button>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default MyGallery