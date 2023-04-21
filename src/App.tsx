import React, { useEffect, useState } from 'react';
import { Routes, Route , BrowserRouter} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/CS-header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import Orders from './pages/Orders';
import { checkAuthenticated } from './slices/auth-slice';
function App() {
  const { isAuthenticated,user } = useAppSelector((state) => state.auth
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(checkAuthenticated());
  },[user]);

  return (
    <>
    <BrowserRouter>
      <Header />
        <main>
           <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Register />} />
                {user && isAuthenticated && <>
                  <Route path='/profile' element={<Profile/> }/>
                </>}
                {user && isAuthenticated && user.role === 'user' && <>
                  <Route path='/cart' element={<Cart/> }/>
                </>}
                {user && isAuthenticated && user.role === 'admin' && <>
                  <Route path='/orders' element={<Orders/> }/>
                </>}
              </Routes>
            </Container>
       </main>
      </BrowserRouter>
    </>
  );
}

export default App;
