import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import IRegisterUser from '../models/register';
import { registerAsync, restStatus, selectStatus } from '../features/Register/registerSlice';
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Register = () => {
  const dispatch = useAppDispatch()
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [first_name, setfirstName] = useState("")
  const [last_name, setlast_name] = useState("")
  const status = useAppSelector(selectStatus);
  const navigate = useNavigate()

  const handleRegister = async() => {
    const usr: IRegisterUser = { username, email, password, first_name, last_name }
    await dispatch(registerAsync(usr))
  }  

  useEffect(() => {
    if (status === 'success'){
      handleSuccess()
    }
  }, [status])
  
  const handleSuccess = ()=>
  {
    toast.success('User added successfully!', {
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
      navigate('/login')
      dispatch(restStatus())
    }, 3000);
  }

  return (
    <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '40%', textAlign: 'center', marginTop: '10%', }}>
      <ToastContainer/>
      <form onSubmit={(e) => { handleRegister(); e.preventDefault() }}>
        <label>
          User name: {" "}
          <input type={'text'} onKeyUp={(e) => setusername(e.currentTarget.value)} required />
        </label><br />
        <label>
          Email: {" "}  
          <input type={'email'} onKeyUp={(e) => setemail(e.currentTarget.value)} required />
        </label><br />
        <label>
          Password: {" "}
          <input type={'password'} onKeyUp={(e) => setpassword(e.currentTarget.value)} required />
        </label><br />
        <label>
          First Name: {" "}
          <input type={'text'} onKeyUp={(e) => setfirstName(e.currentTarget.value)} required />
        </label><br />
        <label>
          Last Name: {" "}
          <input type={'text'} onKeyUp={(e) => setlast_name(e.currentTarget.value)} required />
        </label><br /><br />
        <button className='btn btn-success' type={'submit'}>Submit</button><button className='btn btn-danger' onClick={() => navigate('/')}>Back</button>
        <br />
      </form>
    </div>
  );
}

export default Register;