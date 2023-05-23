import React, { SyntheticEvent, useState } from 'react';
import {  StyledFormContainer,StyledFiltersButton } from './CS-filter.style';
export interface FiltersInterface{
  country: string,
  beansClass: string,
  cookingMethod: string,
  degreeOfRoasting: string,
  processingType: string
    
}
import { Button, Form } from 'react-bootstrap';
const Filters = (props: {onSubmitHandler: (value: FiltersInterface) => void, coffe_filters: FiltersInterface}) => {
   
  const [beansClass, setBeansClass] = useState(props.coffe_filters.beansClass);
  const [country, setCountry] = useState(props.coffe_filters.country);
  const [cookingMethod, setCookingMethod] = useState(props.coffe_filters.cookingMethod);
  const [degreeOfRoasting, setDegreeOfRoasting] = useState(props.coffe_filters.degreeOfRoasting);
  const [processingType, setProcessingType] = useState(props.coffe_filters.processingType);
  const [filtersApplied, setFiltersApplied] = useState(false);
  const submitHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    const coffe_filters = {
      beansClass,
      country,
      cookingMethod,
      degreeOfRoasting,
      processingType
    }
    props.onSubmitHandler(coffe_filters)
    setFiltersApplied(true);
  };
  const resetHandler = (event: SyntheticEvent) => {
    event.preventDefault();
    /*setBeansClass('');
    setCookingMethod('');
    setCountry('');
    setDegreeOfRoasting('');
    setProcessingType('');*/
    const coffe_filters = {
      beansClass: '',
      country: '',
      cookingMethod: '',
      degreeOfRoasting: '',
      processingType: ''
    }
    props.onSubmitHandler(coffe_filters)
    setFiltersApplied(false);
  }
  return (
 
        <StyledFormContainer>
          <Form  onSubmit={submitHandler}>
               <Form.Group controlId='country' className='my-3'>
                   <Form.Label>Country</Form.Label>
                  <Form.Select aria-label="Default select example" value={country}
                  onChange={(e) => setCountry(e.target.value)}>
                          <option>Select </option>
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
                          <option>Select</option>
                          <option value="premium">Premium</option>
                          <option value="spetialty">Spetialty</option>
                   </Form.Select>
                  </Form.Group>

                <Form.Group controlId='cookingMethod' className='my-3'>
                   <Form.Label>Cooking Method</Form.Label>
                  <Form.Select aria-label="Default select example" value={cookingMethod}
                  onChange={(e) => setCookingMethod(e.target.value)}>
                          <option>Select </option>
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
                          <option>Select </option>
                          <option value="omni">Omni</option>
                          <option value="light">Light</option>
                          <option value="medium">Medium</option>
                   </Form.Select>
                  </Form.Group>
  
                <Form.Group controlId='ProcessingType' className='my-3'>
                   <Form.Label>ProcessingType</Form.Label>
                  <Form.Select aria-label="Default select example" value={processingType}
                  onChange={(e) => setProcessingType(e.target.value)}>
                          <option>Select </option>
                          <option value="washed">Washed</option>
                          <option value="natural">Natural</option>
                          <option value="mixed">Mixed</option>
                   </Form.Select>
               </Form.Group>
            { !filtersApplied ? 
               <StyledFiltersButton variant="primary" type='submit' className='my-3'>Apply Filters</StyledFiltersButton> 
              :<StyledFiltersButton variant="light" type='button' onClick={resetHandler} className='my-3'>Reset Filters</StyledFiltersButton>
        }
           </Form>
        </StyledFormContainer>
  );
};

export default Filters;
