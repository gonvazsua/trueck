import {render, screen} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import App from "../../App";
import Login from "./Login";

describe('Login', () => {

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
    });

});