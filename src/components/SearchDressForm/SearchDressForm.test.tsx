import React from 'react';
import {render, screen} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import SearchDressForm from "./SearchDressForm";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

describe('searchDressForm test', () => {

    const history = createMemoryHistory();

    const renderComponent = () => {
        return render(
            <Router history={history}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <SearchDressForm/>
                </MuiPickersUtilsProvider>
            </Router>
        )
    };

    test('should render component', () => {
        renderComponent();
        expect(screen.getByTestId('searchDressForm')).toBeInTheDocument();
    });

});