import React from 'react';
import { Routes, Route , BrowserRouter, Navigate} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/CS-header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import WrapingRoute from './components/CS-wraping-route';

function App() {
  return (
    <>
    <BrowserRouter>
      <Header />
        <main>
           <Container>
              <Routes>
              <Route path="/" element={<WrapingRoute page={<Home />}/>} />
                <Route path="/login" element={<Login />} />
                <Route path="/registration" element={<Register />}></Route>
                <Route path='/cart' element={<WrapingRoute page={<Cart/>} />} />
                <Route path='/profile' element={<WrapingRoute page={<Profile />} />} />
              </Routes>
            </Container>
       </main>
      </BrowserRouter>
    </>
  );
}

export default App;
