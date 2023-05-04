import React, { SyntheticEvent, useEffect } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { logout } from "../../slices/auth-slice";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping} from '@fortawesome/free-solid-svg-icons'
import { Span, Wrapper } from "./CS-styled-header";
import { getItems } from "../../slices/cart-slice";
const Header = () => {

  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart)
  console.log(items)
  useEffect(() => {
    dispatch((getItems()))
  }, [])
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
                {user?.role !== 'admin' && <Nav.Link href='/cart'><Wrapper><FontAwesomeIcon icon={faCartShopping} style={{ color: "#f3f4fb", }} /><Span>{items.length}</Span></Wrapper></Nav.Link> }
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