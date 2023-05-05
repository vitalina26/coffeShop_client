import React, { useEffect, useState } from "react"
import { Button, Form, ListGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hooks";
import FormContainer from "../components/CS-form-container/CS-form-container";
import { editUser, reset } from "../slices/auth-slice";
import styled from 'styled-components';
const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 50rem;
    padding:30px 0px;
    margin: 0px auto;
   
`
export const ListHeader = styled.h3`
text-align: center;
`  
const ListItem = styled(ListGroup.Item) `     
//margin:15px
`
const ProfileButton = styled(Button) `     
max-width: 10rem;
margin-top:10px
`
const Profile = () => {
  const [showEditForm, setShowEditForm] = useState(false);
  const dispatch = useAppDispatch();
  const { user , isSuccess } = useAppSelector((state) => state.auth);
  const editButtonHendler = () => {
    setShowEditForm(true);
  }
  const [firstname, setFirstName] = useState(user?.firstname)
  const [secondname, setSecondName] = useState(user?.secondname)
  const [email, setEmail] = useState(user?.email)
  const [phonenumber, setPhonenumber] = useState(user?.phonenumber)
  const [validated, setValidated] = useState(false);
  const submitHandler = async (e:any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(false);
    } else {
      const user = { email, phonenumber, firstname, secondname }
      console.log(user);
      dispatch(editUser(user))
      setShowEditForm(false);
  
    }
    setValidated(true);
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
                        <ListItem>
                          <h4> {firstname} {secondname}  </h4>
                          </ListItem>
                        <ListItem>Email: {email}</ListItem>
                        <ListItem>Phonenumber: {phonenumber}</ListItem>
                        <ProfileButton variant="light" onClick={editButtonHendler} >Edit Profile</ProfileButton>
                      </ListGroup>}
      {showEditForm &&
            <FormContainer>
            <h1 className='my-3'>Edit Profile</h1>
              <Form noValidate validated={validated} onSubmit={submitHandler}>
                  
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
                          minLength = {5}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                         type='email'
                         placeholder='Enter your email address'
                         value={email}
                         onChange={(e) => setEmail(e.target.value)} 
                      />
                      <Form.Control.Feedback type="invalid">
                        Please write valid an email.
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId='phonenumber' className='my-3'>
                      <Form.Label>Phonenumber</Form.Label>
                      <Form.Control
                          pattern='^[0-9]{10}$'                  
                          type='phonenumber'
                          placeholder='Enter your phonenumber'
                          value={phonenumber}
                          onChange={(e) => setPhonenumber(e.target.value)}
                      />
                     <Form.Control.Feedback type="invalid">
                    Phonenumber must have 10 numbers.
                  </Form.Control.Feedback>
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