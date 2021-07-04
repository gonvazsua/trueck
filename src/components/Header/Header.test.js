import {render, screen} from "@testing-library/react";
import Header from "./Header";
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import {RecoilRoot} from "recoil";

describe('Header', () => {

    const history = createBrowserHistory();

    const renderComponent = () => {
        return render(
            <RecoilRoot>
                <Router history={history}>
                    <Header />
                </Router>
            </RecoilRoot>
            );
    };

    test('should render the Header', () => {

        renderComponent();
        expect(screen.getByTestId('header-menuIcon')).toBeInTheDocument();
        expect(screen.getByTestId('header-title')).toHaveTextContent('Trueck');

    });

    test('should render login button when user is not logged in', () => {
        renderComponent();
        expect(screen.getByTestId('header-loginButton')).toBeInTheDocument();
    });

    test('should redirect to login when clicking on login button', () => {
        renderComponent();
        const loginButton = screen.getByTestId('header-loginButton');
        expect(loginButton).toBeInTheDocument();
        loginButton.click();
        expect(history.location.pathname).toEqual('/login');
    });

});