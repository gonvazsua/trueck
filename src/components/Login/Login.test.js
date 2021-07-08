import {fireEvent, render, screen} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import Login from "./Login";
import {useLoginAPI} from "./loginAPI";

jest.mock('./loginAPI');

describe('Login', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    const renderComponent = () => {
        return render(
            <RecoilRoot>
                <Login />
            </RecoilRoot>);
    };

    test('should render login page', () => {
        renderComponent();
        expect(screen.getByTestId('login-title')).toBeInTheDocument();
        expect(screen.getByTestId('login-submitbutton')).toBeInTheDocument();
        expect(screen.getByTestId('login-submitbutton')).toBeDisabled();
    });

    test('should enable submit button when email and password fields are filled', () => {
        renderComponent();
        expect(screen.getByTestId('login-submitbutton')).toBeDisabled();

        fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: 'mockemail@mock.com' } });
        fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: 'mockPassword' } });

        expect(screen.getByTestId('login-submitbutton')).not.toBeDisabled();
    });

    test('should call to login API when clicking on submit', () => {
        renderComponent();

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';
        fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: mockEmail } });
        fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: mockPassword } });
        fireEvent.click(screen.getByTestId('login-submitbutton'));

        expect(useLoginAPI).toBeCalledWith(mockEmail, mockPassword);
    });

});