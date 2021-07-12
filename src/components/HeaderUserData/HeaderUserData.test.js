import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import HeaderUserData from "./HeaderUserData";
import { createMemoryHistory } from 'history';
import { Router } from "react-router";
import {signInWithGoogle, signOut} from "../Login/loginAPI";

jest.mock('../Login/loginAPI');

describe('HeaderUserData', function () {

    const history = createMemoryHistory();

    const renderComponent = (isLoggedInManually = false) => {
        render(
            <Router history={history}>
                <HeaderUserData isLoggedInManually={isLoggedInManually}/>
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

    test('should render logout button when receiving input flag isLoggedInManually', () => {
        renderComponent(true);
        const logoutButton = screen.getByTestId('header-logoutButton');
        expect(logoutButton).toBeInTheDocument();
    });

    test('should call to signOut method in loginAPI whe clicking in logout button and redirect to login', async () => {

        signOut.mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve();
            });
        });

        renderComponent(true);
        const logoutButton = screen.getByTestId('header-logoutButton');
        fireEvent.click(logoutButton);
        expect(signOut).toBeCalledTimes(1);
        await waitFor(() => {
            expect(history.location.pathname).toEqual('login');
        });

    });

});