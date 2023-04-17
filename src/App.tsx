import React from 'react';
import { Routes, Route , BrowserRouter} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/CS-header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
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
              </Routes>
            </Container>
       </main>
      </BrowserRouter>
    </>
  );
}

export default App;
