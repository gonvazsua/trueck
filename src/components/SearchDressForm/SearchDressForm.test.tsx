import {fireEvent, render, screen} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import SearchDressForm from "./SearchDressForm";

describe('LandingPage test', () => {

    const history = createMemoryHistory();

    const renderComponent = () => {
        return render(
            <Router history={history}>
                <SearchDressForm />
            </Router>
        )
    };

    test('should render component', () => {
        renderComponent();
        expect(screen.getByTestId('searchDressForm')).toBeInTheDocument();
    });

});