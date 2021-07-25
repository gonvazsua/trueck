import React from 'react';
import {fireEvent, render, screen} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import SearchDressForm from "./SearchDressForm";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import moment from 'moment';

describe('searchDressForm test', () => {

    const history = createMemoryHistory();

    const renderComponent = (searchFn: any = jest.fn()) => {
        return render(
            <Router history={history}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <SearchDressForm searchFunction={searchFn} />
                </MuiPickersUtilsProvider>
            </Router>
        )
    };

    test('should render component', () => {
        renderComponent();
        expect(screen.getByTestId('searchDressForm')).toBeInTheDocument();
    });

    test('should call to input function when clicking in search button', () => {

        const searchFn = jest.fn();
        const date = moment().format('DD/MM/YYYY');

        renderComponent(searchFn);

        fireEvent.click(screen.getByTestId('SearchDressForm-search'));

        expect(searchFn).toHaveBeenCalledWith(date, date, '', [0,200]);
    });

});