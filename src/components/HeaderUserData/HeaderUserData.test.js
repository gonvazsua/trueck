import {render, screen} from "@testing-library/react";
import HeaderUserData from "./HeaderUserData";
import { createMemoryHistory } from 'history';
import { Router } from "react-router";

describe('HeaderUserData', function () {

    const history = createMemoryHistory();

    const renderComponent = () => {
        render(
            <Router history={history}>
                <HeaderUserData/>
            </Router>
        )
    };

    test('should render component', () => {

        renderComponent();
        expect(screen.getByTestId('header-loginButton')).toBeInTheDocument();

    });

    test('should redirect to login when clicking on login button', () => {
        renderComponent();
        const loginButton = screen.getByTestId('header-loginButton');
        expect(loginButton).toBeInTheDocument();
        loginButton.click();
        expect(history.location.pathname).toEqual('login');
    });

});