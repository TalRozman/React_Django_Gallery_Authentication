import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import IRegisterUser from '../../models/register';
import { registerAsync, selectRegisterError } from './registerSlice';
import { useNavigate } from 'react-router-dom'

export const Register = () => {
  const dispatch = useAppDispatch()
  const [username, setusername] = useState("")
  const [password1, setpassword1] = useState("")
  const [password2, setpassword2] = useState("")
  const error = useAppSelector(selectRegisterError)
  const navigate = useNavigate()

  const handleRegister=()=>
  {
    const usr:IRegisterUser = {username,password1,password2}
    dispatch(registerAsync(usr))
  }
  return (
    <div style={{display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '40%',textAlign:'center',padding: '25% 0',}}>
      <form onSubmit={(e)=>{handleRegister();e.preventDefault()}}>
        <label>
          User name:
          <input onKeyUp={(e) => setusername(e.currentTarget.value)} />
        </label><br/>
        <label>
          Password:
          <input type={'password'} onKeyUp={(e) => setpassword1(e.currentTarget.value)} />
        </label><br/>
        <label>
          Confirm Password:
          <input type={'password'} onKeyUp={(e) => setpassword2(e.currentTarget.value)} />
        </label><br/><br/>
        <button className='btn btn-success' type={'submit'}>Submit</button><button className='btn btn-danger' onClick={()=>navigate('/')}>Back</button>
        <br/><>{ error }</>
      </form>
    </div>
  );
}

export default Register;