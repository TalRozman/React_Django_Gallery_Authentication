import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddImage from './features/gallery/AddImage';
import ShowGallery from './features/gallery/ShowGallery';
import Login from './features/Login/Login';
import Profile from './features/Profile/Profile';
import Register from './features/Register/Register';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='showGallery/' element={<ShowGallery/>}/>
            <Route path='addImage/' element={<AddImage/>}/>
            <Route path='register/' element={<Register/>}/>
            <Route path='profile/' element={<Profile/>}/>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
