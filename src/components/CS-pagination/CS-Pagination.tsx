import Pagination from 'react-bootstrap/Pagination';
import React from 'react';

const CoffeItemsPagination = (props: {
    nPages: number,
    currentPage: number,
    onCurrentPage: (value: number) => void
}) => {
    const nextPage = () => {
        if (props.currentPage !== props.nPages)
            props.onCurrentPage(props.currentPage + 1)
    }
    const prevPage = () => {
        if (props.currentPage !== 1)
            props.onCurrentPage(props.currentPage - 1)
    }
    const pageNumbers = [];
    for (let i = 1; i <= props.nPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <Pagination>
            <Pagination.Prev data-testid="prev-button" onClick={prevPage}  disabled={props.currentPage === 1 ? true : false} />

        {pageNumbers.map(pageNumber => (
            <Pagination.Item data-testid="pagination-item" key = { pageNumber } active = {props.currentPage === pageNumber}
            onClick = {() => props.onCurrentPage(pageNumber)}>
            {pageNumber} </Pagination.Item>)
        )}
      <Pagination.Next  data-testid="next-button" onClick={nextPage} disabled={props.currentPage === pageNumbers.length ? true : false} />

    </Pagination>
  );
}

export default CoffeItemsPagination;