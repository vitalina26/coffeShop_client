import React, { SyntheticEvent, useEffect,useState } from "react"
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { Form, Button } from 'react-bootstrap'
import FormContainer from "../../components/CS-form-container/CS-form-container"
import { useNavigate, useParams } from "react-router-dom";
import { createCoffe, editCoffe, getCoffe, resetCoffe } from "../../store/slices/coffe-slice"
import Image from 'react-bootstrap/Image'
import axios from 'axios'
import { Coffe } from "../../models/Coffe";
import { StyledButton } from "./CreateCoffe.style";

const CoffeForm = () => {
  const {action, id} = useParams() as {action: string, id: string};
  const dispatch = useAppDispatch()
  const { coffe } = useAppSelector((state) => state.coffe)
  const navigate = useNavigate()
  const [name, setName] = useState(coffe.name)
  const [price, setPrice] = useState(coffe.price)
  const [description, setDescription] = useState(coffe.description)
  const [beansClass, setBeansClass] = useState(coffe.beansClass)
  const [country, setCountry] = useState(coffe.country)
  const [cookingMethod, setCookingMethod] = useState(coffe.cookingMethod)
  const [degreeOfRoasting, setDegreeOfRoasting] = useState(coffe.degreeOfRoasting)
  const [processingType, setProcessingType] = useState(coffe.processingType)
  const [img_url, setImgUrl] = useState(coffe.img_url)
  const [image, setImage] = useState('');
  const [validated, setValidated] = useState(false);
  useEffect(() => {
      if (action === 'edit') {
        dispatch(getCoffe(id)).then(
          (value) => {
          const temp_coffe = value.payload as Coffe;
          setName(temp_coffe.name);
          setPrice(temp_coffe.price);
          setDescription(temp_coffe.description);
          setBeansClass(temp_coffe.beansClass);
          setCountry(temp_coffe.country);
          setDegreeOfRoasting(temp_coffe.degreeOfRoasting);
          setProcessingType(temp_coffe.processingType);
          setImgUrl(temp_coffe.img_url);
          setCookingMethod(temp_coffe.cookingMethod);
           }
         )
          
        }
     else {
          //clearForm();
         // dispatch(reset());
      }
    }, [])

   
    const clearForm = () => {
      setName('');
      setPrice(0);
      setDescription('');
      setBeansClass('');
      setCountry('');
      setDegreeOfRoasting('');
      setProcessingType('');
      setImgUrl('');
    }
    const submitHandler = async (e: any) => {
        e.preventDefault();
      const form = e.currentTarget;
      if (form.checkValidity() === false) {
        e.stopPropagation();
      } 
        if (action === 'edit') {
          const coffe_ = { id: coffe.id, cookingMethod, beansClass, name, price: price, description, degreeOfRoasting, processingType, country,img_url }
              dispatch(editCoffe(coffe_))       
        } else {
          const coffe_ = { cookingMethod, beansClass, name, price: price, description, degreeOfRoasting, processingType, country,img_url }
              dispatch(createCoffe(coffe_))
          }
        clearForm();
        dispatch(resetCoffe())
        navigate('/')
        window.location.reload();
      
      
      setValidated(true);
    }
  const handleUpload = (e: SyntheticEvent) => {
      e.preventDefault();
      console.log(image)
      const formData = new FormData ();
      formData.append("file", image);
      formData.append("upload_preset", "pogpvl4r");
      console.log(formData)
      axios.post(
      'https://api.cloudinary.com/v1_1/dibklmm6d/image/upload',
      formData
      )
      .then((response) => {
      console.log(response);
      setImgUrl(response.data.secure_url);
      })
      .catch((error: any) => {
      console.log(error);
      });
      
      };
    return (
        <FormContainer>
        <h1 className='my-3'>Coffe</h1>
          <Form  validated={validated} onSubmit={submitHandler}>
               <Form.Group controlId='name' className='my-3'>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    required
                    type='firstName'
                    placeholder='Enter your first name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                <Form.Control.Feedback type="invalid">
                  Please write a First Name.
                </Form.Control.Feedback>
                 </Form.Group>
                
                <Form.Group controlId='price' className='my-3'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    required
                    type='lastName'
                    placeholder='Enter your last name'
                    value={price}
                    onChange={(e) => setPrice(parseInt(e.target.value)? parseInt(e.target.value) : 0 )}
                  />
                </Form.Group>
               <Form.Group controlId='description' className='my-3'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                     required
                     as="textarea" rows={4} type="description"
                     placeholder='Enter your description'
                     value={description}
                     onChange={(e) => setDescription(e.target.value)} 
                   />
                </Form.Group>
                <Form.Group controlId='country' className='my-3'>
                   <Form.Label>Country</Form.Label>
                   <Form.Select aria-label="Default select example" value={country} required = {action !== 'edit'}
                      onChange={(e) => setCountry(e.target.value)}>
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
                   <Form.Select aria-label="Default select example" value={beansClass} required = {action !== 'edit'}
                      onChange={(e) => setBeansClass(e.target.value)}>
                          <option value="premium">Premium</option>
                          <option value="spetialty">Spetialty</option>
                   </Form.Select>
                  </Form.Group>

                <Form.Group controlId='cookingMethod' className='my-3'>
                   <Form.Label>Cooking Method</Form.Label>
                   <Form.Select aria-label="Default select example" value={cookingMethod} required = {action !== 'edit'}
                      onChange={(e) => setCookingMethod(e.target.value)}>
                          <option value="cezva">Cezva</option>
                          <option value="filter">Filter</option>
                          <option value="espresso">Espresso</option>
                          <option value="geyser">Geyser</option>
                   </Form.Select>
                  </Form.Group>
 
               <Form.Group controlId='degreeOfRoasting' className='my-3'>
                   <Form.Label>Degree Of Roasting</Form.Label>
                   <Form.Select aria-label="Default select example" value={degreeOfRoasting} required = {action !== 'edit'}
                      onChange={(e) => setDegreeOfRoasting(e.target.value)}>
                          <option value="omni">Omni</option>
                          <option value="light">Light</option>
                          <option value="medium">Medium</option>
                   </Form.Select>
                  </Form.Group>
  
                <Form.Group controlId='ProcessingType' className='my-3'>
                   <Form.Label>ProcessingType</Form.Label>
                   <Form.Select aria-label="Default select example" value={processingType} required = {action !== 'edit'}
                      onChange={(e) => setProcessingType(e.target.value)}>
                          <option value="washed">Washed</option>
                          <option value="natural">Natural</option>
                          <option value="mixed">Mixed</option>
                   </Form.Select>
               </Form.Group>
               <Form.Group className="position-relative mb-3">
                 <Form.Label>File</Form.Label>
                  <Form.Control
                    required = {action !== 'edit'}
                     type="file"
                     name="file"
                     onChange={(e: any) => {  setImage(e.target.files[0]) } }
                  />
                 <StyledButton variant="light" onClick={handleUpload} className='my-3'>Upload</StyledButton>
                <Image src={img_url} />
                </Form.Group>
                <Button variant="light" type='submit' className='my-3'>
                  { action === 'edit'? 'Update' : 'Add New'}
                </Button>
           </Form>
      </FormContainer>
    )
  }
  
  export default CoffeForm