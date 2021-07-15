import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import {LoginResponse, signInWithEmailAndPassword} from "./loginAPI";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import Login from "./Login";
const Cookies = require('js-cookie');

jest.mock('./loginAPI');
jest.mock('js-cookie', () => jest.fn());

describe('Login', () => {

    const history = createMemoryHistory();

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    const renderComponent = () => {
        return render(
            <RecoilRoot>
                <Router history={history}>
                    <Login />
                </Router>
            </RecoilRoot>);
    };

    test('should render login page', () => {
        renderComponent();
        expect(screen.getByTestId('login-title')).toBeInTheDocument();
        expect(screen.getByTestId('login-submitButton')).toBeInTheDocument();
        expect(screen.getByTestId('login-submitButton')).toBeDisabled();
    });

    test('should enable submit button when email and password fields are filled', () => {
        renderComponent();
        expect(screen.getByTestId('login-submitButton')).toBeDisabled();

        fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: 'mockemail@mock.com' } });
        fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: 'mockPassword' } });

        expect(screen.getByTestId('login-submitButton')).not.toBeDisabled();
    });

    test('should call to login API when clicking on sing in with Username and Password', () => {

        (signInWithEmailAndPassword as jest.Mock).mockImplementation(() => {
            return new Promise<void>((resolve) => {
                resolve();
            });
        });

        renderComponent();

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';
        fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: mockEmail } });
        fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: mockPassword } });
        fireEvent.click(screen.getByTestId('login-submitButton'));

        expect(signInWithEmailAndPassword).toBeCalledWith(mockEmail, mockPassword);
    });

    test('should show incorrect login message when the login process fails', async () => {

        (signInWithEmailAndPassword as jest.Mock).mockImplementation(() => {
            return new Promise<string>((resolve, reject) => {
                reject('Login error');
            });
        });

        renderComponent();

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';
        fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: mockEmail } });
        fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: mockPassword } });
        fireEvent.click(screen.getByTestId('login-submitButton'));

        await waitFor(() => {
            expect(screen.getByTestId('login-loginIncorrectMessage')).toBeInTheDocument();
        });

    });

});