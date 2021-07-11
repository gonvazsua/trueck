import {render, screen} from "@testing-library/react";
import Header from "./Header";
import { createMemoryHistory } from 'history';
import { Router } from "react-router";

describe('Header', () => {

    const history = createMemoryHistory();
    const nameMock = 'NameMock';

    const renderComponent = () => {
        return render(
            <Router history={history}>
                <Header />
            </Router>
            );
    };

    test('should render the Header', () => {

        renderComponent(nameMock, false);
        expect(screen.getByTestId('header-menuIcon')).toBeInTheDocument();
        expect(screen.getByTestId('header-title')).toHaveTextContent('Trueck');

    });

    test('should render login button when user is not logged in', () => {
        renderComponent(nameMock, false);
        expect(screen.getByTestId('header-loginButton')).toBeInTheDocument();
    });

    test('should redirect to login when clicking on login button', () => {
        renderComponent(nameMock, false);
        const loginButton = screen.getByTestId('header-loginButton');
        expect(loginButton).toBeInTheDocument();
        loginButton.click();
        expect(history.location.pathname).toEqual('login');
    });

});