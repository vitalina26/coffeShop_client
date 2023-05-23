import {
  FC,
  useState,
  useEffect,
} from 'react';
import React from 'react';

import { Form, Button } from 'react-bootstrap'
import FormContainer from '../../components/CS-form-container/CS-form-container'
import {  useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { register, reset } from '../../store/slices/auth-slice';
import WarningModal from '../../components/CS-warning-modal/CS-warning-modal';

const Register: FC = () => {
  const [firstname, setFirstName] = useState('')
  const [secondname, setSecondName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phonenumber, setPhonenumber] = useState('')
  const [role, setRole] = useState('user')
  const [validated, setValidated] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const clearForm = () => {
    setFirstName('');
    setEmail('');
    setPassword('');
    setPhonenumber('');
    setSecondName('');
    setRole('');
  }

  const dispatch = useAppDispatch();
  const {  isSuccess,user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  
  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate('/login');
    }
  }, [isSuccess, dispatch]);
  
  const submitHandler = async (e: any) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(false);
    } else {
      const userDto = { email, password, role, phonenumber, firstname, secondname }
      dispatch(register(userDto)).then((value) => {
        if (!user) {
          setUserExist(true);
        }
        })
    }
   
    setValidated(true);
  }
  return (
    <FormContainer>
      <h1 className='my-3'>Sign Up</h1>
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
                  Please write a First Name.
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
                  Please write a Last Name.
                </Form.Control.Feedback>
                </Form.Group>

              <Form.Group controlId='email' className='my-3'>
                <Form.Label>Email address</Form.Label>
              <Form.Control
                   pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                   required 
                   type='email'
                   minLength={5}
                   placeholder='Enter your email address'
                   value={email}
                   onChange={(e) => setEmail(e.target.value)} 
                  />
                  <Form.Control.Feedback type="invalid">
                    Please write an email.
                  </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId='password' className='my-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                   required
                   type='password'
                   placeholder='Enter your password'
                   value={password}
                   minLength = {8}
                   onChange={(e) => setPassword(e.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                    Please write at least 8 symbols.
                  </Form.Control.Feedback>
             </Form.Group>
              
              <Form.Group controlId='phonenumber' className='my-3'>
                <Form.Label>Phonenumber</Form.Label>
                  <Form.Control
                    pattern='^[0-9]{10}$'  
                    required
                    type='phonenumber'
                    placeholder='Enter your phonenumber'
                    value={phonenumber}
                    onChange={(e) => setPhonenumber(e.target.value)}
                  />
                <Form.Control.Feedback type="invalid">
                    Phonenumber must have 10 numbers.
                  </Form.Control.Feedback>
                </Form.Group>

              <Form.Group controlId='role' className='my-3'>
                 <Form.Label>Role</Form.Label>
                 <Form.Select aria-label="Default select example" value={role} required
                    onChange={(e) => setRole(e.target.value)}>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>

                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    Please choose role.
                  </Form.Control.Feedback>
                </Form.Group>

              <Button variant="light" type='submit' className='my-3'>
                Sign Up
              </Button>
        </Form>
      {userExist && <WarningModal show={userExist} onHide={()=>setUserExist(false)} />}
    </FormContainer>
  )
}

export default Register