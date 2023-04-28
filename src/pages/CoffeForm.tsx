import React, { SyntheticEvent, useEffect,useState } from "react"
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { Form, Button, Stack } from 'react-bootstrap'
import { CoffeDto } from "../dto/CoffeDto"
import FormContainer from "../components/CS-form-container"
import { useNavigate, useParams } from "react-router-dom";
import { createCoffe, editCoffe, getCoffe } from "../slices/coffe-slice"
import { reset } from "../slices/auth-slice"
const CoffeForm = () => {
    const {action, id} = useParams() as {action: string, id: string};
    const dispatch  = useAppDispatch()
    const { coffe } = useAppSelector((state) => state.coffe)
    const navigate = useNavigate()
    useEffect(() => {
        if (action === 'edit') {
            dispatch(getCoffe(id));
        } else {
            dispatch(reset());
        }
    }, [])
    const [name, setName] = useState(coffe.name)
    const [price, setPrice] = useState(coffe.price)
    const [description, setDescription] = useState(coffe.description)
    const [beansClass, setBeansClass] = useState(coffe.beansClass)
    const [country, setCountry] = useState(coffe.country)
    const [cookingMethod, setCookingMethod] = useState(coffe.cookingMethod)
    const [degreeOfRoasting, setDegreeOfRoasting] = useState(coffe.degreeOfRoasting)
    const [processingType, setProcessingType] = useState(coffe.processingType)

    const clearForm = () => {
      setName('');
      setPrice(0);
      setDescription('');
      setBeansClass('');
      setCountry('');
      setDegreeOfRoasting('');
      setProcessingType('');
    }
    const submitHandler = async (e: SyntheticEvent) => {
        e.preventDefault();
        const coffe_ = { id: coffe.id, cookingMethod, beansClass, name, price: price, description, degreeOfRoasting, processingType, country, }
        if (action === 'edit') {
            dispatch(editCoffe(coffe_))       
        } else {
            dispatch(createCoffe(coffe_))
        }
        clearForm();
        navigate('/')
      }
    return (
        <FormContainer>
        <h1 className='my-3'>Coffe</h1>
          <Form onSubmit={submitHandler}>
               <Form.Group controlId='name' className='my-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type='firstName'
                    placeholder='Enter your first name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                 </Form.Group>
  
                <Form.Group controlId='price' className='my-3'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type='lastName'
                    placeholder='Enter your last name'
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value)? parseInt(e.target.value) : 0 )}
                  />
                </Form.Group>
               <Form.Group controlId='description' className='my-3'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                     as="textarea" rows={4} type="description"
                     placeholder='Enter your description'
                     value={description}
                     onChange={(e) => setDescription(e.target.value)} 
                   />
                </Form.Group>
                <Form.Group controlId='country' className='my-3'>
                   <Form.Label>Country</Form.Label>
                   <Form.Select aria-label="Default select example" value={country}
                      onChange={(e) => setCountry(e.target.value)}>
                          <option>Open this select menu</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Ethiopia">Ethiopia</option>
                          <option value="Guatemala">Guatemala</option>
                          <option value="Guinea">Guinea</option>
                          <option value="Indonesia">Indonesia</option>
                          <option value="Kenya">Kenya</option>
                          <option value="Colombia">Colombia</option>
                   </Form.Select>
                </Form.Group>
                
                <Form.Group controlId='beansClass' className='my-3'>
                   <Form.Label>Beans Class</Form.Label>
                   <Form.Select aria-label="Default select example" value={beansClass}
                      onChange={(e) => setBeansClass(e.target.value)}>
                          <option>Open this select menu</option>
                          <option value="premium">Premium</option>
                          <option value="spetialty">Spetialty</option>
                   </Form.Select>
                  </Form.Group>

                <Form.Group controlId='cookingMethod' className='my-3'>
                   <Form.Label>Cooking Method</Form.Label>
                   <Form.Select aria-label="Default select example" value={cookingMethod}
                      onChange={(e) => setCookingMethod(e.target.value)}>
                          <option>Open this select menu</option>
                          <option value="cezva">Cezva</option>
                          <option value="filter">Filter</option>
                          <option value="espresso">Espresso</option>
                          <option value="geyser">Geyser</option>
                   </Form.Select>
                  </Form.Group>
 
               <Form.Group controlId='degreeOfRoasting' className='my-3'>
                   <Form.Label>Degree Of Roasting</Form.Label>
                   <Form.Select aria-label="Default select example" value={degreeOfRoasting}
                      onChange={(e) => setDegreeOfRoasting(e.target.value)}>
                          <option>Open this select menu</option>
                          <option value="omni">Omni</option>
                          <option value="light">Light</option>
                          <option value="medium">Medium</option>
                   </Form.Select>
                  </Form.Group>
  
                <Form.Group controlId='ProcessingType' className='my-3'>
                   <Form.Label>ProcessingType</Form.Label>
                   <Form.Select aria-label="Default select example" value={processingType}
                      onChange={(e) => setProcessingType(e.target.value)}>
                          <option>Open this select menu</option>
                          <option value="washed">Washed</option>
                          <option value="natural">Natural</option>
                          <option value="mixed">Mixed</option>
                   </Form.Select>
                  </Form.Group>
                <Button variant="light" type='submit' className='my-3'>
                  { action === 'edit'? 'Update' : 'Add New'}
                </Button>
           </Form>
      </FormContainer>
    )
  }
  
  export default CoffeForm