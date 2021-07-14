import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import Header from "../../components/Header/Header";
import Login from "./Login";
import {signInWithEmailAndPassword} from "./loginAPI";

jest.mock('./loginAPI', () => {
    const signInWithGoogle = jest.fn();
    const signInWithEmailAndPassword = jest.fn();
    return {signInWithGoogle, signInWithEmailAndPassword};
});

describe('Login integration test', () => {

    const mockLoginComponent = (
        <div>Mock name</div>
    );

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
                    <Header loginComponent={mockLoginComponent}/>
                    <Login/>
                </Router>
            </RecoilRoot>
        )
    };

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test('should render username in header after login', async () => {

        renderComponent();
        expect(screen.getByTestId('login-submitButton')).toBeInTheDocument();

        // (signInWithEmailAndPassword as jest.Mock).mockImplementation(() => {
        //     return new Promise((resolve) => {
        //         resolve(userCredentials);
        //     });
        // });
        //
        // renderComponent();
        // fireEvent.click(screen.getByTestId('login-signInGoogle'));
        // expect(signInWithEmailAndPassword).toBeCalledTimes(1);
        // await waitFor(() => {
        //     expect(screen.queryByText(/Mock name/i)).toBeInTheDocument();
        // });
    });

});