import {render, screen} from "@testing-library/react";
import LandingPage from "./LandingPage";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import React from "react";

describe('LandingPage test', () => {

    const history = createMemoryHistory();

    const renderComponent = () => {
        return render(
            <Router history={history}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <LandingPage/>
                </MuiPickersUtilsProvider>
            </Router>
        )
    };

    test('should render component', () => {
        renderComponent();
        expect(screen.getByTestId('landingPage')).toBeInTheDocument();
    });

});