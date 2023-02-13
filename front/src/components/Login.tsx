import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Iuser from '../models/user';
import ShowGallery from './ShowGallery';
import { loginAsync, selectError, selectlogged } from '../features/Login/loginSlice';

export const Login = () => {
  const logged = useAppSelector(selectlogged);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const [username, setuserName] = useState("")
  const [password, setpassword] = useState("")

  return (
    <div>
      {logged ? <ShowGallery /> :
        <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '40%', textAlign: 'center', paddingTop: '10%' }} >
          <label>
            Username: {" "}
            <input type={'text'} onKeyUp={(e) => setuserName(e.currentTarget.value)} />
          </label><br />
          <label>
            Password: {" "}
            <input type={'text'} onKeyUp={(e) => setpassword(e.currentTarget.value)}/>
          </label><br /><br />
          <button className='btn btn-info' onClick={() => { const usr: Iuser = { username, password }; dispatch(loginAsync(usr)) }}>Log In</button>
          <br />{error}
        </div>}
    </div>
  );
}

export default Login;