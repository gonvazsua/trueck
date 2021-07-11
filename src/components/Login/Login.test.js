import {fireEvent, render, screen} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import Login from "./Login";
import {signInWithGoogle, signInWithEmailAndPassword} from "./loginAPI";
import {createMemoryHistory} from "history";
import {Router} from "react-router";

jest.mock('./loginAPI');

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

        renderComponent();

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';
        fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: mockEmail } });
        fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: mockPassword } });
        fireEvent.click(screen.getByTestId('login-submitButton'));

        expect(signInWithEmailAndPassword).toBeCalledWith(mockEmail, mockPassword);
    });

    test('should call to sing in with Google when click in button Sign in with Google',  () => {
        renderComponent();
        fireEvent.click(screen.getByTestId('login-signInGoogle'));
        expect(signInWithGoogle).toBeCalledTimes(1);
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

    test('should redirect to Root path after signing in with Google',  () => {
        renderComponent();
        fireEvent.click(screen.getByTestId('login-signInGoogle'));
        expect(signInWithGoogle).toBeCalledTimes(1);
        expect(history.location.pathname).toEqual('/')
    });

});