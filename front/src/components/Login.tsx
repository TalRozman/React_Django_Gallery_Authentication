import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import Iuser from '../models/user';
import ShowGallery from './ShowGallery';
import { loginAsync, rememberAsync, rememberMe, selectError, selectlogged } from '../features/Login/loginSlice';

export const Login = () => {
  const logged = useAppSelector(selectlogged);
  const error = useAppSelector(selectError);
  const dispatch = useAppDispatch();
  const [username, setuserName] = useState("")
  const [password, setpassword] = useState("")
  const [remember, setremember] = useState(false)

  const handleLogin = async (usr: Iuser) => {
    await dispatch(loginAsync(usr));
    if (remember) {
      dispatch(rememberMe(true));
      dispatch(rememberAsync(String(sessionStorage.getItem("tmpToken"))))
    }
  }
  return (
    <div>
      {logged ? <ShowGallery /> :
        <div style={{ display: 'block', marginLeft: 'auto', marginRight: 'auto', width: '40%', textAlign: 'center', paddingTop: '10%' }} >
          <form>
            <label>
              Username: {" "}
              <input type={'text'} onKeyUp={(e) => setuserName(e.currentTarget.value)} style={{ textTransform: 'none',textAlign:'center' }} />
            </label><br />
            <label>
              Password: {" "}
              <input type={'text'} className="psw" onKeyUp={(e) => setpassword(e.currentTarget.value)} style={{textAlign:'center',textTransform: 'none'}}/>
            </label><br />
            <label>
              Remember me?: {" "}
              <input type={'checkbox'} onClick={(e) => setremember(e.currentTarget.checked)} />
            </label><br /><br />
            <button className='btn btn-info' onClick={() => { const usr: Iuser = { username, password }; handleLogin(usr) }}>Log In</button>
          </form>
          <br />{error}
        </div>}
    </div>
  );
}

export default Login;