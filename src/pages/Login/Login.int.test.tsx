import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import Header from "../../components/Header/Header";
import Login from "./Login";
import {LoginResponse, signInWithEmailAndPassword} from "../../api/login/loginAPI";
import HeaderUserData from "../../components/HeaderUserData/HeaderUserData";
import {AxiosResponse} from "axios";

jest.mock('../../api/login/loginAPI');
describe('Login integration test', () => {

    const history = createMemoryHistory();

    const renderComponent = () => {
        return render(
            <RecoilRoot>
                <Router history={history}>
                    <Header loginComponent={<HeaderUserData />}/>
                    <Login/>
                </Router>
            </RecoilRoot>
        )
    };

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test('should render logout button in header after login', async () => {

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

        renderComponent();

        expect(screen.queryAllByTestId('header-logoutButton')).toHaveLength(0);

        let mockEmail = 'mockemail@mock.com';
        let mockPassword = 'mockPassword';
        fireEvent.change(screen.getByTestId('login-emailField'), { target: { value: mockEmail } });
        fireEvent.change(screen.getByTestId('login-passwordField'), { target: { value: mockPassword } });
        fireEvent.click(screen.getByTestId('login-submitButton'));

        await waitFor(() => {
            expect(screen.getByTestId('header-logoutButton')).toBeInTheDocument();
        });

    });

});