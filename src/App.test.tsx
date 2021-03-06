import {act, render, screen} from '@testing-library/react';
import App from './App';
import {RecoilRoot} from "recoil";


describe('App component', () => {

    const renderComponent = () => {
        return render(
            <RecoilRoot>
                <App/>
            </RecoilRoot>);
    };

    test('should render App compoment', () => {
        renderComponent();
        expect(screen.getByTestId('app')).toBeInTheDocument();
        expect(screen.getByTestId('landingPage')).toBeInTheDocument();
    });

    test('should render header and login component', () => {
        renderComponent();
        const loginButton = screen.getByTestId('header-loginButton');
        expect(loginButton).toBeInTheDocument();
        act(() => loginButton.click());
        expect(screen.getByTestId('login-title')).toBeInTheDocument();
    });

});