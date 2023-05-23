import { Form, Button } from 'react-bootstrap'
import React, { SyntheticEvent } from 'react'
import FormContainer from '../../components/CS-form-container/CS-form-container'
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { login, reset } from '../../store/slices/auth-slice'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [validated, setValidated] = React.useState(false);
  const clearForm = () => {
    setEmail('');
    setPassword('');
  }
  const dispatch = useAppDispatch();

  const { isAuthenticated, isSuccess } = useAppSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate('/');
    }
  }, [isSuccess, dispatch]);

  React.useEffect(() => {
    if (!isAuthenticated) return;
    dispatch(reset());
    clearForm();
  }, [isAuthenticated]);

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(false);
    }
    dispatch(login({ email, password }))
    setValidated(true);
  }
  
  return (
    <FormContainer>
      <h1>Login</h1>
      <Form noValidate validated={validated} onSubmit={submitHandler}>
        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            minLength = {5}
            required
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
                  Please write valid email.
                </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            required
            minLength = {8}
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Control.Feedback type="invalid">
            Please write at least 8 symbols.
          </Form.Control.Feedback>          
        </Form.Group>

        <Button variant="light" type='submit' className='my-3'>
          Login
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Login