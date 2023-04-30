import { Form, Button } from 'react-bootstrap'
import React, { SyntheticEvent, useEffect, useState } from 'react'
import FormContainer from '../components/CS-form-container/CS-form-container'
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { login, reset } from '../slices/auth-slice'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const clearForm = () => {
    setEmail('');
    setPassword('');
  }
  const dispatch = useAppDispatch();

  const { isAuthenticated, isSuccess } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate('/');
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(reset());
    clearForm();
    navigate('/');
  }, [isAuthenticated]);

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log({email, password});
    dispatch(login({ email, password }))
  }
  
  return (
    <FormContainer>
      <h1>Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="light" type='submit' className='my-3'>
          Login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Login