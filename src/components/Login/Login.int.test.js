import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Header from "../Header/Header";
import Login from "./Login";
import {RecoilRoot} from "recoil";
import {signInWithGoogle} from "./loginAPI";
import {createMemoryHistory} from "history";
import {Router} from "react-router";

jest.mock('./loginAPI', () => {
    const signInWithGoogle = jest.fn();
    const signInWithEmailAndPassword = jest.fn();
    return {signInWithGoogle, signInWithEmailAndPassword};
});

describe('Login integration test', () => {

    const userCredentials = {
        user: {
            displayName: 'Mock name'
        }
    };

    const history = createMemoryHistory();

    const renderComponent = () => {
        return render(
            <RecoilRoot>
                <Router history={history}>
                    <Header/>
                    <Login/>
                </Router>
            </RecoilRoot>
        )
    };

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test('should render username in header after login', async () => {

        signInWithGoogle.mockImplementation(() => {
            return new Promise((resolve, reject) => {
                resolve(userCredentials);
            });
        });

        renderComponent();
        fireEvent.click(screen.getByTestId('login-signInGoogle'));
        expect(signInWithGoogle).toBeCalledTimes(1);
        await waitFor(() => {
            expect(screen.queryByText(/Mock name/i)).toBeInTheDocument();
        });
    });

});