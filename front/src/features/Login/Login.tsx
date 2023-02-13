import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import Iuser from '../../models/user';
import ShowGallery from '../gallery/ShowGallery';
import { loginAsync, selectError, selectRefresh } from './loginSlice';
import { useNavigate } from 'react-router-dom'

export const Login = () => {
  const logged = useAppSelector(selectRefresh);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const [username, setuserName] = useState("")
  const [password, setpassword] = useState("")
  const navigate = useNavigate()
  
  return (
    <div>
      {logged ? <ShowGallery/> : <div style={{display: 'block',marginLeft: 'auto',marginRight: 'auto',width: '40%',textAlign:'center',padding: '25% 0',}}>
          <label>
            Username: {" "}
            <input onKeyUp={(e) => setuserName(e.currentTarget.value)} />
          </label><br />
          <label>
            Password: {" "}
            <input type={'password'} onKeyUp={(e) => setpassword(e.currentTarget.value)} />
          </label><br /><br/>
          <button className='btn' onClick={() => { const usr:Iuser = {username, password}; dispatch(loginAsync(usr)) }}>Log In</button><button className='btn' onClick={()=>navigate('/register/')}>Register</button>
          <br />{error}
        </div>}
    </div>
  );
}

export default Login;