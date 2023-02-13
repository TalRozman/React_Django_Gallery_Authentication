import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './app.css'
import { useAppDispatch, useAppSelector } from './app/hooks';
import { logout, selectlogged, selectToken } from './features/Login/loginSlice';
import jwtDecode from 'jwt-decode';

function App() {
  const dispatch = useAppDispatch()
  const logged = useAppSelector(selectlogged)
  const token = useAppSelector(selectToken)
  let decodedToken: any;

  if (logged === true) {
    decodedToken = jwtDecode(token)
  }

  return (
    <div>
      {logged ?
        <nav className='topNav'>
          <ul className='topNav'>
            <li className='topNav'><Link className="active" to={'/'}>Home</Link></li>
            <li className='topNav'><Link to={'showGallery'}>My images</Link></li>
            <li className='topNav'><Link to={'addImage'}>Add image</Link></li>
            <li className='topNav'><Link to={'profile'}>My profile</Link></li>
            <li className='topNav' style={{ float: "right" }}><Link to={'profile'}>Wellcome {decodedToken.username}</Link></li>
            <li className='topNav' style={{ float: "right" }}><Link to={'/'} onClick={() => { dispatch(logout()); }}>Log out</Link></li>
          </ul>
        </nav> :
        <nav className='topNav'>
          <ul className='topNav'>
            <li className='topNav'><Link className="active" to={'/'}>Home</Link></li>
            <li className='topNav'><Link to={'/shop'}>Shop</Link></li>
            <li className='topNav' style={{ float: "right" }}><Link to={'register'}>Register</Link></li>
            <li className='topNav' style={{ float: "right" }}><Link to={'login'}>Log in</Link></li>
          </ul><br /><br /><br /><br />
        </nav>}
      <Outlet />
        <footer className="footer">
          <div className="container">
            <p>Copyright &copy; {new Date().getFullYear()} My React App</p>
            <Link to={'/contact'} style={{color:'white',textDecoration:'none'}}>Contact us</Link>
            <p>
              Made with the help of Tal Rozman by OpenAI
            </p>
          </div>
        </footer>
    </div>
  );
}

export default App;
