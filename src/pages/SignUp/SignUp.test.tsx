import {render, screen} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import SignUp from "./SignUp";

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

    test('should render SignUp page', () => {
        renderComponent();
        expect(screen.getByTestId('SignUp')).toBeInTheDocument();
    });

});