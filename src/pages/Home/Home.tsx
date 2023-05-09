import React, { SyntheticEvent, useEffect, useState } from "react"
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks'
import { useNavigate } from "react-router-dom"
import { Button, Container} from "react-bootstrap";
import CoffeItem from "../../components/CS-coffe/CS-coffe";
import { getAllCoffes } from "../../slices/coffe-items-slice";
import SearchByName from "../../components/CS-search-by-name/CS-search-by-name";
import Filters, { FiltersInterface } from "../../components/CS-filter/CS-filter";
import SortByPrice from "../../components/CS-sorting/CS-sortByPrice";
import CoffeItemsPagination from "../../components/CS-pagination/CS-Pagination";
import { resetCoffe } from "../../slices/coffe-slice";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ContainerOfCoffe, ContainerOfFilter, ContainerOfPagination } from "./styledHome";
import { filterSearchSortMyCoffeItems } from "../../StrategyPattern/filterSearchSortFunc";

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
  const [currentPage, setCurrentPage] = useState(1);
// Кількість записів для відображення на кожній сторінці    
  const [recordsPerPage] = useState(4);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const filtersValueListener = (enteredFilterValue: FiltersInterface) => { 
    setFiltersValue(enteredFilterValue);
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
  const filterValue = {
    filtersValue: {
      country: filtersValue.country,
      beansClass: filtersValue.beansClass,
      cookingMethod: filtersValue.cookingMethod,
      degreeOfRoasting: filtersValue.degreeOfRoasting,
      processingType: filtersValue.processingType,
    },
    orderValue,
    searchValue,
  }
  
  const filteredCoffeItems = filterSearchSortMyCoffeItems([...allCoffes], filterValue);
  return (
    <Container>
      <h1>Wellcome to the CoffeShop</h1>
      <ContainerOfFilter>
        <SearchByName onSearch={searchValueListener} value={searchValue} />
        <SortByPrice onSorting={orderValueListener} value={orderValue } />
        {isAuthenticated && user?.role === 'admin' && (<Button variant="primary" onClick={addHandler} className='my-3'>Add New Coffe</Button>)}
      </ContainerOfFilter>
      <Container>
        <Row>
          <Col>
            <Filters onSubmitHandler={filtersValueListener} coffe_filters={filtersValue} />
          </Col>
          <Col lg={10}  xs = {12}>
            <ContainerOfCoffe>
              {filteredCoffeItems.length > 0 &&
              filteredCoffeItems.slice(indexOfFirstRecord, indexOfLastRecord).map((coffe_item) => (
                <CoffeItem key={coffe_item.id} coffe={coffe_item} role = {user ? user.role : 'none'} />
                ))}
            </ContainerOfCoffe>
           </Col>
          </Row>
        </Container>
      
      {filteredCoffeItems.length > 4 && <ContainerOfPagination>
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