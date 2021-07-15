import React from 'react';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import HeaderUserData from "./HeaderUserData";
import {createMemoryHistory} from 'history';
import {Router} from "react-router";
import {signInWithEmailAndPassword, signOut} from "../../pages/Login/loginAPI";
import {RecoilRoot} from "recoil";
import {loginDataAtom, LoginState, loginStatusAtom} from "../../pages/Login/loginDataAtom";

jest.mock('../../pages/Login/loginAPI');

describe('HeaderUserData', function () {

    const history = createMemoryHistory();

    const renderComponent = (email: string, password: string, rememberMe: boolean, loggedIn: boolean) => {
        const loginState: LoginState = {
            email: email,
            password: password,
            rememberMe: rememberMe,
            incorrectLogin: false
        }
        render(
            <RecoilRoot initializeState={(snap) => {
                snap.set(loginDataAtom, loginState)
                snap.set(loginStatusAtom, loggedIn)
            }}>
                <Router history={history}>
                    <HeaderUserData/>
                </Router>
            </RecoilRoot>
        )
    };

    test('should render component', () => {
        renderComponent('', '', false, false);
        expect(screen.getByTestId('header-loginButton')).toBeInTheDocument();
    });

    test('should redirect to login when clicking on login button', () => {
        renderComponent('', '', false, false);
        const loginButton = screen.getByTestId('header-loginButton');
        expect(loginButton).toBeInTheDocument();
        loginButton.click();
        expect(history.location.pathname).toEqual('login');
    });

    test('should do the login when the rememberMe was clicked during login process', () => {

        (signInWithEmailAndPassword as jest.Mock).mockImplementation(() => {
            return new Promise<void>((resolve) => {
                resolve();
            });
        });

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';
        renderComponent(mockEmail, mockPassword, true, false);

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockEmail, mockPassword);
    });

    test('should render logout button when receiving the state loggedIn is true', () => {
        renderComponent('', '', false, true);
        const logoutButton = screen.getByTestId('header-logoutButton');
        expect(logoutButton).toBeInTheDocument();
    });

    test('should call to signOut method in loginAPI whe clicking in logout button and redirect to login', async () => {

        (signOut as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                resolve(null);
            });
        });

        renderComponent('', '', false, true);
        const logoutButton = screen.getByTestId('header-logoutButton');
        fireEvent.click(logoutButton);
        expect(signOut).toBeCalledTimes(1);
        await waitFor(() => {
            expect(history.location.pathname).toEqual('login');
        });

    });

});