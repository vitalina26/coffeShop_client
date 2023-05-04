import React, { SyntheticEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from '../hooks/redux-hooks'
import { useNavigate } from "react-router-dom"
import { Button, Container} from "react-bootstrap";
import CoffeItem from "../components/CS-coffe/CS-coffe";
import { getAllCoffes } from "../slices/coffe-items-slice";
import styled from "styled-components";
import SearchByName from "../components/CS-search-by-name/CS-search-by-name";
import Filters, { FiltersInterface } from "../components/CS-filter/CS-filter";
import SortByPrice from "../components/CS-sorting/CS-sortByPrice";
import CoffeItemsPagination from "../components/CS-pagination/CS-Pagination";
import { resetCoffe } from "../slices/coffe-slice";
export const ContainerOfCoffe = styled.div`
    display: flex;
    //justify-content: center;
    gap:15px;
    flex-wrap: wrap;
    padding:30px;
    margin: 0px auto;
    /* background: white; */
`
export const ContainerOfFilter = styled.div`
    display: flex;
    //justify-content: ;
    gap:15px;
    flex-wrap: wrap;
    padding:30px;
    margin: 0px auto;
    /* background: white; */
`  
export const ContainerOfPagination = styled.div`
display: flex;
justify-content: center;
flex-wrap: wrap;
`  
const Home = () => {
  const navigate  = useNavigate();
  const dispatch  = useAppDispatch()
  const { allCoffes } = useAppSelector((state) => state.coffes)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const addHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
   dispatch(resetCoffe());
    navigate(`/coffeform/create/new/`)
  }
  useEffect(() => {
    dispatch(getAllCoffes())
  }, [])
  const initialFilters: FiltersInterface = {
    country: '',
    beansClass: '',
    cookingMethod: '',
    degreeOfRoasting: '',
    processingType: ''
  }

  const [orderValue, setOrderValue] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [filtersValue, setFiltersValue] = useState(initialFilters)
  const [showFilters, setShowFilters] = useState(false)
  const [currentPage, setCurrentPage] = useState(1);
// Кількість записів для відображення на кожній сторінці    
  const [recordsPerPage] = useState(4);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const filtersValueListener = (enteredFilterValue: FiltersInterface) => { 
    setFiltersValue(enteredFilterValue);
    setShowFilters(false);
  };
  const orderValueListener = (enteredOrderValue:string) => { 
    setOrderValue(enteredOrderValue);
  };
  const searchValueListener = (enteredValue: string) => { 
    setSearchValue(enteredValue);
  };
  const currentPageListener = (enteredValue: number) => { 
    setCurrentPage(enteredValue);
  };
  
  const filterSearchSortMyCoffeItems = () => {
    let res = [...allCoffes];
    if (filtersValue.beansClass !== '') {
        res = res.filter(item => {
            return item.beansClass === filtersValue.beansClass;
        });
    }
    if (filtersValue.cookingMethod !== '') {
      res = res.filter(item => {
          return item.cookingMethod === filtersValue.cookingMethod;
      });
    }
    if (filtersValue.country !== '') {
      res = res.filter(item => {
          return item.country === filtersValue.country;
      });
    }
    if (filtersValue.degreeOfRoasting !== '') {
      res = res.filter(item => {
          return item.degreeOfRoasting === filtersValue.degreeOfRoasting;
      });
    }
    if (filtersValue.processingType !== '') {
      res = res.filter(item => {
          return item.processingType === filtersValue.processingType;
      });
    }

    if (orderValue !== '') {
        if (orderValue === 'asc') {
            res.sort((a, b) => a.price - b.price);
        }
        if  (orderValue === 'desc') {
            res.sort((a, b) => b.price - a.price);
        }
    }
    if (searchValue !== '') {
      res = res.filter(item => {
          return item.name.toLowerCase().match(searchValue.toLowerCase())? true : false;
      });
    }

    return res;
}
  const filteredCoffeItems = filterSearchSortMyCoffeItems();
  //const nPages = Math.ceil(filterSearchSortMyCoffeItems.length / recordsPerPage)
  return (
    <Container>
      <h1>Wellcome to the CoffeShop</h1>
      <ContainerOfFilter>
        {!showFilters &&
          <>
            <SearchByName onSearch={searchValueListener} value={searchValue} />
            <SortByPrice onSorting={orderValueListener} value={orderValue } />
            {isAuthenticated && user?.role === 'admin' && (<Button variant="light" onClick={addHandler} className='my-3'>Add New Coffe</Button>)}
            <Button variant="light" onClick={(e) => setShowFilters(true)} className='my-3'>Show Filters</Button>
          </>}
        {showFilters&&<Filters onSubmitHandler={filtersValueListener} coffe_filters={filtersValue} />}        
      </ContainerOfFilter>
      <ContainerOfCoffe>
      {filteredCoffeItems.length > 0 &&
          filteredCoffeItems.slice(indexOfFirstRecord, indexOfLastRecord).map((coffe_item) => (
            <CoffeItem key={coffe_item.id} coffe={coffe_item} role = {user ? user.role : 'none'} />
          ))}
      </ContainerOfCoffe>
      {filteredCoffeItems.length > 0 && <ContainerOfPagination>
        <CoffeItemsPagination
          nPages={Math.ceil(filteredCoffeItems.length / recordsPerPage)}
          currentPage={currentPage}
          onCurrentPage={currentPageListener}
        />
      </ContainerOfPagination>}
    </Container>

    )
  }
  
  export default Home