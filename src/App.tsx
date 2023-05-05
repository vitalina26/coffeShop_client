import React, { useEffect} from 'react';
import { Routes, Route , BrowserRouter} from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/CS-header/CS-header';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import { useAppDispatch, useAppSelector } from './hooks/redux-hooks';
import Orders from './pages/Orders';
import { checkAuthenticated } from './slices/auth-slice';
import CoffeForm from './pages/CreateCoffe';
import { Main, SiteContainer } from './components/CS-site-container/CS-site-container';
import Footer from './components/CS-footer/CS-footer';
import OrderHistory from './pages/OrderHistory';
//import Footer from './components/CS-footer/CS-footer';
function App() {
  const { isAuthenticated,user } = useAppSelector((state) => state.auth
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(checkAuthenticated());
  },[]);

  return (
    <>
    <BrowserRouter>
      <SiteContainer>
        <Header />
          <Main>
            <Container>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registration" element={<Register />} />
                  {user && isAuthenticated && <>
                    <Route path='/profile' element={<Profile/> }/>
                  </>}
                  {user && isAuthenticated && user.role === 'user' && <>
                    <Route path='/cart' element={<Cart />} />
                    <Route path='/orderhistory' element={<OrderHistory/>} />
                  </>}
                  {user && isAuthenticated && user.role === 'admin' && <>
                    <Route path='/orders' element={<Orders />} />
                    <Route path='/coffeform/:action/:id' element={<CoffeForm />} />
                  </>}
                </Routes>
              </Container>
          </Main>
        <Footer/>
      </SiteContainer>  
      
      </BrowserRouter>
    </>
  );
}

export default App;
