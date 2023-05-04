import React, { SyntheticEvent } from 'react';
import { FilterContainer, FilterContainerControl, FilterLabel, FilterSelect } from '../CS-filter/CS-styled-filter';
const SortByPrice = (props:{onSorting: (value:string) => void, value:string}) => {
    const onChangeListener = (event: any) => {
        props.onSorting(event.target.value)
    };
  return (
    <FilterContainer>
      <FilterContainerControl>
        <FilterLabel>Sort</FilterLabel>
        <FilterSelect value={props.value} onChange={onChangeListener}>
          <option>Open this select menu</option>
          <option value='desc'> In descending order</option>
          <option value='asc'>In ascending order</option>
        </FilterSelect>
      </FilterContainerControl>
    </FilterContainer>
  );
};

export default SortByPrice;