import React, { SyntheticEvent } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import { logout } from "../slices/auth-slice";
const Header = () => {
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector(
    (state) => state.auth
  );



  const logoutHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(logout())
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
                <Nav.Link href='/cart'>Cart</Nav.Link>
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