import { Button } from 'react-bootstrap';
import styled from 'styled-components';
export const FilterContainer = styled.div`
color: white;
padding: 0 1rem;
`
export const FilterContainerControl = styled.div`
display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0;
`;
export const FilterLabel = styled.label`
font-weight: bold;
margin-right: 0.5rem;

`
export const FilterSelect = styled.select`
font: inherit;
padding: 0.5rem 3rem;
font-weight: bold;
border-radius: 6px;
`
export const StyledFormContainer = styled.div`
border-radius: 5px;
margin-top: 7px;
background-color: #302f2f;
padding:1px 10px;
`
export const StyledFiltersButton = styled(Button)`
margin: 0px;

`