import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../../components/home/Home';
import "../../../components/home/Home.css";


test("Check that components exist.", () => {
    render(<Home />);
    
    // check heading text
    const heading = screen.queryByText("Find your flight");
    expect(heading).toBeInTheDocument();
    
    // "From" input exists
    const fromInput = screen.queryByTestId("From-input");
    expect(fromInput).toBeInTheDocument();

    // "From" dropDown exists
    const fromDropDown = screen.queryByTestId("From-dropDown")
    expect(fromDropDown).toBeInTheDocument();

    // "To" text input exists
    const toInput = screen.queryByTestId("To-input");
    expect(toInput).toBeInTheDocument();

    // "To" dropDown exists
    const toDropDown = screen.queryByTestId("To-dropDown")
    expect(toDropDown).toBeInTheDocument();
    
    // date input exists
    const dateInput = screen.queryByTestId("Date-input");
    expect(dateInput).toBeInTheDocument();
    
    // time input label exists
    const timeInput = screen.queryByTestId("Time-input");
    expect(timeInput).toBeInTheDocument();
    
    // submit button exists
    const submitButton = screen.queryByText("Search");
    expect(submitButton).toBeInTheDocument();
})