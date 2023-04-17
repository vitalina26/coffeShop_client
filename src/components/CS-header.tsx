import React from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
const Header = () => {

    return (
        <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
          <Container>
            <Navbar.Brand href='/'>Has Beens</Navbar.Brand>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse id='basic-navbar-nav'>
                <Nav className='ms-auto'>
                  <Nav.Link >Logout</Nav.Link>
                </Nav>
                <Nav className='ms-auto'>
                  <Nav.Link href='/registration'>Sign Up</Nav.Link>
                  <Nav.Link href='/login'>Login</Nav.Link>
                </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      )
}
export default Header