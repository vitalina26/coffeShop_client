import React, { SyntheticEvent, useEffect, useState } from "react"
import { Button, Container, Form, ListGroup, Stack } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import FormContainer from "../components/CS-form-container/CS-form-container";
import { editUser, reset } from "../slices/auth-slice";
import styled from 'styled-components';
const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 100wh;
    padding:30px 0px;
    margin: 0px auto;
   
`
const ListHeader = styled.h3`
text-align: center;

`  

const Profile = () => {
    const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useAppDispatch();
    const { user , isSuccess } = useAppSelector((state) => state.auth);
    /*useEffect(() => {

      });*/
      console.log(user);
  const editButtonHendler = () => {
    setShowEditForm(true);
  }
  const [firstname, setFirstName] = useState(user?.firstname)
  const [secondname, setSecondName] = useState(user?.secondname)
  const [email, setEmail] = useState(user?.email)
  const [phonenumber, setPhonenumber] = useState(user?.phonenumber)

  const submitHandler = async (e:SyntheticEvent) => {
    e.preventDefault();
    const user = { email, phonenumber, firstname, secondname }
    console.log(user);
    dispatch(editUser(user))
    setShowEditForm(false);
  }
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
     // clearForm();
    }
  }, [isSuccess, dispatch]);
  return (<ListContainer>
    {!showEditForm && <ListGroup variant="flush">
                        <ListHeader>Profile</ListHeader>
                        <ListGroup.Item>
                          <h4> {firstname} {secondname}  </h4>
                          </ListGroup.Item>
                        <ListGroup.Item>Email: {email}</ListGroup.Item>
                        <ListGroup.Item>Phonenumber: {phonenumber}</ListGroup.Item>
                        <Button variant="light" onClick={editButtonHendler} >Edit Profile</Button>
                      </ListGroup>}
      {showEditForm &&
            <FormContainer>
            <h1 className='my-3'>Edit Profile</h1>
              <Form onSubmit={submitHandler}>
                  
                   <Form.Group controlId='firstName' className='my-3'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type='firstName'
                        placeholder='Enter your first name'
                        value={firstname}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                     </Form.Group>
      
                    <Form.Group controlId='lastName' className='my-3'>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type='lastName'
                        placeholder='Enter your last name'
                        value={secondname}
                        onChange={(e) => setSecondName(e.target.value)}
                      />
                      </Form.Group>
      
                    <Form.Group controlId='email' className='my-3'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                         type='email'
                         placeholder='Enter your email address'
                         value={email}
                         onChange={(e) => setEmail(e.target.value)} 
                       />
                    </Form.Group>
                    <Form.Group controlId='phonenumber' className='my-3'>
                      <Form.Label>Phonenumber</Form.Label>
                      <Form.Control
                          type='phonenumber'
                          placeholder='Enter your phonenumber'
                          value={phonenumber}
                          onChange={(e) => setPhonenumber(e.target.value)}
                      />
                      </Form.Group>
                    <Button variant="light" type='submit' >
                      Change
                    </Button>
                  
             
            </Form>
          </FormContainer>
      }
    
      </ListContainer>)
          
    
    
  }
  
  export default Profile