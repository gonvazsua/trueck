import React from 'react';
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import HeaderUserData from "./HeaderUserData";
import {createMemoryHistory} from 'history';
import {Router} from "react-router";
import {LoginResponse, signInWithEmailAndPassword, signOut} from "../../api/login/loginAPI";
import {RecoilRoot} from "recoil";
import {loginDataAtom, LoginState, loginStatusAtom} from "../../pages/Login/loginDataAtom";
import {User, userAtom} from "../../common/user/userAtom";
import {AxiosResponse} from "axios";

jest.mock('../../api/login/loginAPI');
jest.mock('../../api/user/userAPI');

describe('HeaderUserData', function () {

    const history = createMemoryHistory();
    const mockUser: User = {
        id: 1,
        name: 'Test name'
    }

    const renderComponent = (email: string, password: string, loggedIn: boolean, user: User) => {
        const loginState: LoginState = {
            email: email,
            password: password,
            incorrectLogin: false
        }
        render(
            <RecoilRoot initializeState={(snap) => {
                snap.set(loginDataAtom, loginState)
                snap.set(loginStatusAtom, loggedIn)
                snap.set(userAtom, user)
            }}>
                <Router history={history}>
                    <HeaderUserData/>
                </Router>
            </RecoilRoot>
        )
    };

    test('should render component', () => {
        renderComponent('', '', false, mockUser);
        expect(screen.getByTestId('header-loginButton')).toBeInTheDocument();
    });

    test('should redirect to login when clicking on login button', () => {
        renderComponent('', '', false, mockUser);
        const loginButton = screen.getByTestId('header-loginButton');
        expect(loginButton).toBeInTheDocument();
        loginButton.click();
        expect(history.location.pathname).toEqual('login');
    });

    test('should do the login when the rememberMe was clicked during login process', () => {

        const defaultUser = {
            id: 0,
            name: ''
        };

        (signInWithEmailAndPassword as jest.Mock).mockImplementation(() => {
            return new Promise<AxiosResponse<LoginResponse>>((resolve) => {
                const axiosResponse: AxiosResponse = {
                    data: {token: 'mockToken'},
                    status: 200,
                    statusText: 'OK',
                    config: {},
                    headers: {},
                };
                resolve(axiosResponse);
            });
        });

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';
        renderComponent(mockEmail, mockPassword, true, defaultUser);

        expect(signInWithEmailAndPassword).toHaveBeenCalledWith(mockEmail, mockPassword);
    });

    test('should render logout button when receiving the state loggedIn is true', () => {
        renderComponent('', '', true, mockUser);
        const logoutButton = screen.getByTestId('header-logoutButton');
        expect(logoutButton).toBeInTheDocument();
    });

    test('should call to signOut method in loginAPI whe clicking in logout button and redirect to login', async () => {

        (signOut as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                resolve(null);
            });
        });

        renderComponent('', '', true, mockUser);
        const logoutButton = screen.getByTestId('header-logoutButton');
        fireEvent.click(logoutButton);
        expect(signOut).toBeCalledTimes(1);
        await waitFor(() => {
            expect(history.location.pathname).toEqual('login');
        });

    });

    test('should render user name when user is logged in', async () => {

        renderComponent('', '', true, mockUser);
        await waitFor(() => {
            expect(screen.queryByText(/Test name/i)).toBeInTheDocument();
        });
    });

});