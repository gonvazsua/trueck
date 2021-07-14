import {fireEvent, render, screen} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import { signInWithEmailAndPassword} from "./loginAPI";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import Login from "./Login";

jest.mock('./loginAPI');

describe('Login', () => {

    const history = createMemoryHistory();

    const userCredentials = {
        user: {
            displayName: 'Mock name'
        }
    };

    beforeEach(() => {
        jest.restoreAllMocks();

        (signInWithEmailAndPassword as jest.Mock).mockImplementation(() => {
            return new Promise((resolve) => {
                resolve(userCredentials);
            });
        });

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

        renderComponent();

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';
        fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: mockEmail } });
        fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: mockPassword } });
        fireEvent.click(screen.getByTestId('login-submitButton'));

        expect(signInWithEmailAndPassword).toBeCalledWith(mockEmail, mockPassword);
    });

    test('should redirect to Root path after signing in with username and password', () => {
        renderComponent();

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';
        fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: mockEmail } });
        fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: mockPassword } });
        fireEvent.click(screen.getByTestId('login-submitButton'));

        expect(signInWithEmailAndPassword).toBeCalledWith(mockEmail, mockPassword);

        expect(history.location.pathname).toEqual('/');
    });

});