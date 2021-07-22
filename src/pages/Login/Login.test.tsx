import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import {LoginResponse, signInWithEmailAndPassword} from "../../api/login/loginAPI";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import Login from "./Login";
import {getLoggedUser} from "../../api/user/userAPI";
import {User} from "../../common/user/userAtom";
import {AxiosResponse} from "axios";

jest.mock('../../api/login/loginAPI');
jest.mock('../../api/user/userAPI');
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
            return new Promise<AxiosResponse<LoginResponse>>((resolve, reject) => {
                const axiosResponse: AxiosResponse = {
                    data: null,
                    status: 200,
                    statusText: 'OK',
                    config: {},
                    headers: {},
                };
                reject(axiosResponse);
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

    test('should get logged user information once the login is done', () => {

        (signInWithEmailAndPassword as jest.Mock).mockImplementation(() => {
            return new Promise<LoginResponse>((resolve) => {
                resolve({
                    token: 'mock-token'
                });
            });
        });

        (getLoggedUser as jest.Mock).mockImplementation(() => {
            return new Promise<User>((resolve) => {
                resolve({
                    id: 1,
                    name: 'Test'
                });
            });
        });

        renderComponent();

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';

        act(() => {
            fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: mockEmail } });
            fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: mockPassword } });
            fireEvent.click(screen.getByTestId('login-submitButton'));
        });

        waitFor(() => {
            expect(getLoggedUser).toBeCalled();
        });

    });

});