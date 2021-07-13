import {fireEvent, render, screen} from "@testing-library/react";
import LandingPage from "./LandingPage";
import {createMemoryHistory} from "history";
import {Router} from "react-router";

describe('LandingPage test', () => {

    const history = createMemoryHistory();

    const renderComponent = () => {
        return render(
            <Router history={history}>
                <LandingPage/>
            </Router>
        )
    };

    test('should render component', () => {
        renderComponent();
        expect(screen.getByTestId('landingPage')).toBeInTheDocument();
    });

});