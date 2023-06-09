import React from 'react';
import { FilterContainer, FilterContainerControl, FilterLabel } from '../CS-filter/CS-filter.style';
import { Form } from 'react-bootstrap';
const SearchByName = (props:{onSearch: (value:string) => void, value:string}) => {
    const onChangeListener = (event: any) => {
        props.onSearch(event.target.value)
    };
  return (
    <FilterContainer>
      <FilterContainerControl>
        <FilterLabel>Search</FilterLabel>
        <Form.Control placeholder='Search by name' type = "text" value={props.value} onChange={onChangeListener}/>
      </FilterContainerControl>
    </FilterContainer>
  );
};

export default SearchByName;