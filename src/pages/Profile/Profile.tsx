import React, { useEffect, useState } from "react"
import { Button, Form, ListGroup } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../hooks/redux-hooks";
import { editUser, reset } from "../../store/slices/auth-slice";
import { ListContainer, ListHeader, ListItem, ProfileButton, ProfileFormContainer } from "./Profile.style";

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
    {!showEditForm && <ListGroup style={{ borderRadius: '7px', backgroundColor: '#302f2f', padding: '16px'}} variant="flush">
                        <ListHeader>Profile</ListHeader>
                        <ListItem>
                          <h4> {firstname} {secondname}  </h4>
                          </ListItem>
                        <ListItem>Email: {email}</ListItem>
                        <ListItem>Phonenumber: {phonenumber}</ListItem>
                        <ProfileButton variant="primary" onClick={editButtonHendler} >Edit Profile</ProfileButton>
                      </ListGroup>}
      {showEditForm &&
            <ProfileFormContainer>
            <h2 className='my-3'>Edit Profile</h2>
              <Form noValidate validated={validated} onSubmit={submitHandler}>
                  
                   <Form.Group controlId='firstName' className='my-3'>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      required
                      type='firstName'
                      placeholder='Enter your first name'
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      Please write valid first name.
                    </Form.Control.Feedback>
                     </Form.Group>
      
                    <Form.Group controlId='lastName' className='my-3'>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        required
                        type='lastName'
                        placeholder='Enter your last name'
                        value={secondname}
                        onChange={(e) => setSecondName(e.target.value)}
                      />
                      <Form.Control.Feedback type="invalid">
                         Please write valid last name.
                      </Form.Control.Feedback>
                      </Form.Group>
      
                    <Form.Group controlId='email' className='my-3'>
                      <Form.Label>Email address</Form.Label>
                      <Form.Control
                        required
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
                          required
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
                    <Button variant="primary" type='submit' >
                      Change
                    </Button>
                  
             
            </Form>
          </ProfileFormContainer>
      }
    
      </ListContainer>)
          
    
    
  }
  
  export default Profile