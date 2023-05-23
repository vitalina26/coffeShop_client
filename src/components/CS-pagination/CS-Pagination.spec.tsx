import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import userEvent from "@testing-library/user-event";
import React from "react";
import CoffeItemsPagination from "./CS-Pagination";
import { current } from "@reduxjs/toolkit";
describe("Pagination component", () => {
  test("renders initial state of listData state", () => {
      render(<CoffeItemsPagination
          nPages={1}
          currentPage={1}
          onCurrentPage={(value: number) => { return;}}
      />);
    const paginationItems  = screen.getAllByTestId("pagination-item");
    expect(paginationItems.length).toEqual(1);
  });
  
  
  /*test("disabled prev button if current page = 1", () => {
    render(<CoffeItemsPagination
      nPages={3}
      currentPage={1}
      onCurrentPage={(value: number) => { return;}}
    />);

  const prevButton = screen.getByTestId("prev-button")
  expect(prevButton).toHaveAttribute('disabled');
});

  test("change active pagination item after prev button click", () => {
      render(<CoffeItemsPagination
        nPages={3}
        currentPage={2}
          onCurrentPage={(value: number) => {
            render(<CoffeItemsPagination
                nPages={3}
                currentPage={value}
                onCurrentPage={(value: number) => { return;}}
            />);
          }}
      />);

    const prevButton = screen.getByTestId("prev-button")
    let paginationItems  = screen.getAllByTestId("pagination-item")  
    let paginationItem = paginationItems[0];
    expect(!(paginationItem.getAttribute('active'))).toEqual(true);
    userEvent.click(prevButton);
    paginationItems  = screen.getAllByTestId("pagination-item")    
    paginationItem = paginationItems[0];
    expect(paginationItem).toHaveAttribute('active');
  });*/
});