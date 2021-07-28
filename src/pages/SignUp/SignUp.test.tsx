import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import SignUp from "./SignUp";
import {AxiosResponse} from "axios";
import {findByUsername, UserResponse} from "../../api/user/userAPI";
import {signUp} from "../../api/login/loginAPI";

jest.mock('../../api/user/userAPI');
jest.mock('../../api/login/loginAPI');
describe('SignUp test', () => {

    const history = createMemoryHistory();

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    const renderComponent = () => {
        return render(
            <RecoilRoot>
                <Router history={history}>
                    <SignUp/>
                </Router>
            </RecoilRoot>);
    };

    describe('When validating sign up form', () => {

        test('should render SignUp page', () => {
            renderComponent();
            expect(screen.getByTestId('SignUp')).toBeInTheDocument();
        });

        test('should enable submit button if all fields are filled', async () => {

            renderComponent();
            expect(screen.getByTestId('signup-submitButton')).toBeDisabled();
            act(() => {
                fireEvent.change(screen.getByTestId('signup-fullNameField'), {target: {value: 'Full name'}})
                fireEvent.change(screen.getByTestId('signup-usernameField'), {target: {value: 'username'}})
                fireEvent.change(screen.getByTestId('signup-emailField'), {target: {value: 'mockEmail@test.com'}})
                fireEvent.change(screen.getByTestId('signup-passwordField'), {target: {value: 'pass1'}})
                fireEvent.change(screen.getByTestId('signup-repeatPasswordField'), {target: {value: 'pass2'}})
            });

            await waitFor(() => expect(screen.getByTestId('signup-submitButton')).toBeEnabled());

        });
    });

    describe('When submitting sign up form', () => {

        test('should show password are not the same message if passwords mismatch', async () => {
            renderComponent();
            act(() => {
                fireEvent.change(screen.getByTestId('signup-fullNameField'), {target: {value: 'Full name'}});
                fireEvent.change(screen.getByTestId('signup-usernameField'), {target: {value: 'username'}});
                fireEvent.change(screen.getByTestId('signup-emailField'), {target: {value: 'mockEmail@test.com'}});
                fireEvent.change(screen.getByTestId('signup-passwordField'), {target: {value: 'pass1'}});
                fireEvent.change(screen.getByTestId('signup-repeatPasswordField'), {target: {value: 'pass2'}});
            });

            act(() => {
                fireEvent.click(screen.getByTestId('signup-submitButton'));
            });

            await waitFor(() => expect(screen.getByTestId('signup-passwordMismatch')).toBeInTheDocument());
        });

        test('should show username is not available if username exists by verifying if username is available', async () => {

            (findByUsername as jest.Mock).mockImplementation(() => {
                return new Promise<AxiosResponse<UserResponse>>((resolve) => {
                    const axiosResponse: AxiosResponse = {
                        data: {users: [{id: 1, username: 'test'}]},
                        status: 200,
                        statusText: 'KO',
                        config: {},
                        headers: {},
                    };
                    resolve(axiosResponse);
                });
            });

            renderComponent();
            act(() => {
                fireEvent.change(screen.getByTestId('signup-fullNameField'), {target: {value: 'Full name'}});
                fireEvent.change(screen.getByTestId('signup-usernameField'), {target: {value: 'username'}});
                fireEvent.change(screen.getByTestId('signup-emailField'), {target: {value: 'mockEmail@test.com'}});
                fireEvent.change(screen.getByTestId('signup-passwordField'), {target: {value: 'pass1'}});
                fireEvent.change(screen.getByTestId('signup-repeatPasswordField'), {target: {value: 'pass1'}});
            });

            act(() => {
                fireEvent.click(screen.getByTestId('signup-submitButton'));
            });

            await waitFor(() => expect(findByUsername).toBeCalledWith('username'));
            await waitFor(() => expect(screen.getByTestId('signup-usernameNotAvailable')).toBeInTheDocument());
        });

        test('should shows success message if the signup process is successful', async () => {

            (findByUsername as jest.Mock).mockImplementation(() => {
                return new Promise<AxiosResponse<UserResponse>>((resolve) => {
                    const axiosResponse: AxiosResponse = {
                        data: {users: []},
                        status: 200,
                        statusText: 'OK',
                        config: {},
                        headers: {},
                    };
                    resolve(axiosResponse);
                });
            });

            (signUp as jest.Mock).mockImplementation(() => {
                return new Promise<AxiosResponse<void>>((resolve) => {
                    const axiosResponse: AxiosResponse = {
                        data: {},
                        status: 200,
                        statusText: 'OK',
                        config: {},
                        headers: {},
                    };
                    resolve(axiosResponse);
                });
            });

            renderComponent();
            act(() => {
                fireEvent.change(screen.getByTestId('signup-fullNameField'), {target: {value: 'Full name'}});
                fireEvent.change(screen.getByTestId('signup-usernameField'), {target: {value: 'username'}});
                fireEvent.change(screen.getByTestId('signup-emailField'), {target: {value: 'mockEmail@test.com'}});
                fireEvent.change(screen.getByTestId('signup-passwordField'), {target: {value: 'pass1'}});
                fireEvent.change(screen.getByTestId('signup-repeatPasswordField'), {target: {value: 'pass1'}});
            });

            act(() => {
                fireEvent.click(screen.getByTestId('signup-submitButton'));
            });

            await waitFor(() => expect(signUp).toBeCalledWith('Full name', 'username', 'mockEmail@test.com', 'pass1'));
            await waitFor(() => expect(screen.getByTestId('signup-success')).toBeInTheDocument());
        });

        test('should render error message if the signup process is not successful', async () => {

            (findByUsername as jest.Mock).mockImplementation(() => {
                return new Promise<AxiosResponse<UserResponse>>((resolve) => {
                    const axiosResponse: AxiosResponse = {
                        data: {users: []},
                        status: 200,
                        statusText: 'OK',
                        config: {},
                        headers: {},
                    };
                    resolve(axiosResponse);
                });
            });

            (signUp as jest.Mock).mockImplementation(() => {
                return new Promise<AxiosResponse<void>>((resolve) => {
                    const axiosResponse: AxiosResponse = {
                        data: {},
                        status: 500,
                        statusText: 'There was an unexpected error',
                        config: {},
                        headers: {},
                    };
                    resolve(axiosResponse);
                });
            });

            renderComponent();
            act(() => {
                fireEvent.change(screen.getByTestId('signup-fullNameField'), {target: {value: 'Full name'}});
                fireEvent.change(screen.getByTestId('signup-usernameField'), {target: {value: 'username'}});
                fireEvent.change(screen.getByTestId('signup-emailField'), {target: {value: 'mockEmail@test.com'}});
                fireEvent.change(screen.getByTestId('signup-passwordField'), {target: {value: 'pass1'}});
                fireEvent.change(screen.getByTestId('signup-repeatPasswordField'), {target: {value: 'pass1'}});
            });

            act(() => {
                fireEvent.click(screen.getByTestId('signup-submitButton'));
            });

            await waitFor(() => expect(signUp).toBeCalledWith('Full name', 'username', 'mockEmail@test.com', 'pass1'));
            await waitFor(() => expect(screen.getByTestId('signup-error')).toBeInTheDocument());
        });

    });


});