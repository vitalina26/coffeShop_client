import React, { useEffect } from 'react';
import { Routes, Route , BrowserRouter} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/CS-header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import { verifyJwt } from './slices/auth-slice';

function App() {
  const {   jwt } = useAppSelector((state) => state.auth
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!jwt || !jwt?.token) return;

    dispatch(verifyJwt(jwt.token));
  }, [jwt]);
  return (
    <>
    <BrowserRouter>
      <Header />
        <main>
           <Container>
              <Routes>
              <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Register />}></Route>
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/profile' element={<Profile />}/>
              </Routes>
            </Container>
       </main>
      </BrowserRouter>
    </>
  );
}

export default App;
