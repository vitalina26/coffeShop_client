import { Button, ListGroup } from "react-bootstrap"
import styled from "styled-components"

export const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 30rem;
    padding:30px 0px;
    margin: 30px auto;
    border-radius: 7px;
   
`
export const ListHeader = styled.h3`
text-align: center;
`  
export const ListItem = styled(ListGroup.Item) `     
background-color: #302f2f;
border: 1px solid
`
export const ProfileButton = styled(Button) `     
max-width: 10rem;
margin-top:15px;
margin-left:10px;
`
export const ProfileFormContainer = styled.div`
border-radius: 5px;
margin-top: 7px;
background-color: #302f2f;
//max-width: 50rem;
padding:16px;
`
