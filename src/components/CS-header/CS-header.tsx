import React, { SyntheticEvent } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { logout } from "../../slices/auth-slice";
import { useNavigate } from "react-router-dom";
const Header = () => {

  const dispatch = useAppDispatch();

  const { isAuthenticated ,user} = useAppSelector(
    (state) => state.auth
  );
  const navigate  = useNavigate();


  const logoutHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logout())
    navigate('/')
  }

    return (
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand href='/'>Has Beens</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
            {isAuthenticated ? (
              <Nav className='ms-auto'>
                <Nav.Link onClick={logoutHandler} >Logout</Nav.Link>
                <Nav.Link href='/profile'>Profile</Nav.Link>
                {user?.role === 'user'&& <Nav.Link href='/cart'>Cart</Nav.Link> }
                {user?.role === 'admin' && <Nav.Link href='/orders'>Orders</Nav.Link>}
              </Nav>
            ) : (
              <><Nav className='ms-auto'>
                  <Nav.Link href='/registration'>Sign Up</Nav.Link>
                  <Nav.Link href='/login'>Login</Nav.Link>
                </Nav></>)}
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
}
export default Header