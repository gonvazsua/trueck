import {fireEvent, render, screen} from "@testing-library/react";
import Header from "./Header";
import {createMemoryHistory} from "history";
import {Router} from "react-router";

describe('Header', () => {

    const childComponent = (
        <div>Mock component</div>
    );

    const history = createMemoryHistory();

    const renderComponent = (childComponent = null, initialPath = '/') => {
        history.push(initialPath);
        return render(
            <Router history={history}>
                <Header login={childComponent}/>
            </Router>
        );
    };

    test('should render the Header', () => {
        renderComponent();
        expect(screen.getByTestId('header-title')).toHaveTextContent('Trueck');
        expect(screen.getByTestId('header-wishes')).toBeInTheDocument();
        expect(screen.getByTestId('header-shoppingCart')).toBeInTheDocument();
    });

    test('should render child component', () => {
        renderComponent(childComponent);
        expect(screen.queryByText(/Mock component/i)).toBeInTheDocument();
    });

    test('should redirect to the root path when clicking in title', () => {
        renderComponent();
        const title = screen.getByTestId('header-title');
        fireEvent.click(title);
        expect(history.location.pathname).toEqual('/')
    });

});