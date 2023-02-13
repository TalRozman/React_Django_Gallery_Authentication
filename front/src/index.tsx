import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import AddImage from './components/AddImage';
import ShowGallery from './components/ShowGallery';
import Profile from './components/Profile';
import Register from './components/Register';
import Shop from './components/Shop';
import Contact from './components/Contact';
import Diary from './components/Diary';
import Bread from './components/Bread';
import Vegetables from './components/Vegetables';
import Fruits from './components/Fruits';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<h1 style={{textAlign:'center'}}>My Gallery</h1>}/>
          <Route path='login' element={<Login />} />
          <Route path='showGallery' element={<ShowGallery />} />
          <Route path='addImage' element={<AddImage />} />
          <Route path='register' element={<Register />} />
          <Route path='profile' element={<Profile />} />
          <Route path='contact' element={<Contact/>}/>
          <Route path='shop' element={<Shop/>}>
            <Route index element={<h1 style={{textAlign:'center'}}>Please select one of the catagories</h1>}/>
            <Route path='diary' element={<Diary/>}/>
            <Route path='bread' element={<Bread/>}/>
            <Route path='vegetables' element={<Vegetables/>}/>
            <Route path='fruits' element={<Fruits/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
);
