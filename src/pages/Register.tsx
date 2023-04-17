import {
  FC,
  useState,
  SyntheticEvent,
  useEffect,
} from 'react';
import React from 'react';

import { Form, Button, Stack } from 'react-bootstrap'
import FormContainer from '../components/CS-form-container'
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks';
import { register, reset } from '../slices/auth-slice';

const Register: FC = () => {
  const [firstname, setFirstName] = useState('')
  const [secondname, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [role, setRole] = useState('')
 
  const clearForm = () => {
    setFirstName('');
    setEmail('');
    setPassword('');
    setPhonenumber('');
    setSecondName('');
    setRole('');
  }

  const dispatch = useAppDispatch();

  const {  isSuccess } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate('/login');
    }
  }, [isSuccess, dispatch]);
  
  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const user = { email, password, role, phonenumber, firstname, secondname }
    console.log(user);
    dispatch(register(user))
    
  }
  return (
    <FormContainer>
      <h1 className='my-3'>Sign Up</h1>
        <Form onSubmit={submitHandler}>
            <Stack gap={3}>
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

              <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                   type='password'
                   placeholder='Enter your password'
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
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

              <Form.Group controlId='role' className='my-3'>
                 <Form.Label>Role</Form.Label>
                 <Form.Select aria-label="Default select example" value={role}
                    onChange={(e) => setRole(e.target.value)}>
                        <option>Open this select menu</option>
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                 </Form.Select>
                </Form.Group>

              <Button variant="light" type='submit' className='my-3'>
                Sign Up
              </Button>
            </Stack>   
       
      </Form>
    </FormContainer>
  )
}

export default Register