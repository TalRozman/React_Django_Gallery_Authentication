import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import IProfile from '../models/profile'
import { logout, selectToken } from '../features/Login/loginSlice'
import { addProfileAsync, delProfileAsync, getProfileAsync, selectProfile, selectProfileRefresh, updProfileAsync } from '../features/Profile/profileSlice'
import { toast, ToastContainer } from 'react-toastify'

const Profile = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const token = useAppSelector(selectToken)
    const [phoneNum, setphoneNum] = useState("")
    const [address, setaddress] = useState("")
    const [birthDate, setbirthDate] = useState("")
    const tokenDecode = jwtDecode<any>(token)
    const profile = useAppSelector(selectProfile)
    const refresh = useAppSelector(selectProfileRefresh)
    const [isUpdate, setisUpdate] = useState(false)

    const myobj = { "id": +tokenDecode!.user_id, token }

    const handleSubmit = () => {
        const pro: IProfile = { "address": address, "birthDate": birthDate, "phoneNum": phoneNum, "user": tokenDecode.user_id }
        const obj = { pro, token }
        dispatch(addProfileAsync(obj))
    }

    const handleEdit = () => {
        const pro: IProfile = { "address": address, "birthDate": birthDate, "phoneNum": phoneNum, "user": tokenDecode.user_id }
        const obj = { pro, token }
        dispatch(updProfileAsync(obj))
        setisUpdate(false)
    }
    const handleDelete = () => {
        toast.success('User deleted successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "colored",
        });
        setTimeout(() => {
            navigate('/')
            dispatch(delProfileAsync(myobj))
            dispatch(logout())
        }, 3000);
    }

    useEffect(() => {
        dispatch(getProfileAsync(myobj))
    }, [refresh])

    return (
        <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '40%', textAlign: 'center', marginTop: '10%' }}>
            <ToastContainer />
            {profile.length ?
                (!isUpdate ?
                    <div>
                        <h1>My Profile</h1>
                        <p>my address - {profile[0]?.address}</p>
                        <p>my birth date - {profile[0]?.birthDate}</p>
                        <p>my phone number - {profile[0]?.phoneNum}</p>
                        <button className='btn btn-info' onClick={() => setisUpdate(true)}>Update</button><button className='btn btn-danger' onClick={() => handleDelete()}>Delete User</button>
                        <br /><button onClick={() => navigate('/showGallery')} className="btn btn-warning">Back</button>
                    </div> :
                    <form onSubmit={(e) => { handleEdit(); e.preventDefault() }}>
                        <h1>Edit my profile</h1><br />
                        <label>
                            Phone Number: {" "}
                            <input type={'text'} onKeyUp={(e) => setphoneNum(e.currentTarget.value)} required />
                        </label><br />
                        <label>
                            Birth Date: {" "}
                            <input type={'date'} onChange={(e) => setbirthDate(e.currentTarget.value)} required />
                        </label><br />
                        <label>
                            Address: {" "}
                            <input type={'text'} onKeyUp={(e) => setaddress(e.currentTarget.value)} required />
                        </label><br /><br />
                        <button className='btn btn-success' type={'submit'}>Update</button><button className='btn btn-danger' onClick={() => setisUpdate(false)}>Cancel</button>
                        <br />
                    </form>
                )
                : <form onSubmit={(e) => { handleSubmit(); e.preventDefault() }}>
                    <label>
                        Phone Number: {" "}
                        <input type={'text'} onKeyUp={(e) => setphoneNum(e.currentTarget.value)} required />
                    </label><br />
                    <label>
                        Birth Date: {" "}
                        <input type={'date '} onChange={(e) => setbirthDate(e.currentTarget.value)} required />
                    </label><br />
                    <label>
                        Address: {" "}
                        <input type={'text'} onKeyUp={(e) => setaddress(e.currentTarget.value)} required />
                    </label><br /><br />
                    <button className='btn btn-success' type={'submit'}>Submit</button><button className='btn btn-warning' onClick={() => navigate('/showGallery')}>Back</button>
                    <br />
                </form>}
        </div>
    )
}

export default Profile