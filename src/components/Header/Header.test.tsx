import {fireEvent, render, screen} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import Header from "./Header";
import React from "react";

describe('Header', () => {

    const childComponent = (
        <div>Mock component</div>
    );

    const history = createMemoryHistory();

    const renderComponent = (childComponent:React.ReactNode = null, initialPath: string = '/') => {
        history.push(initialPath);
        return render(
            <Router history={history}>
                <Header loginComponent={childComponent}/>
            </Router>
        );
    };

    test('should render the Header', () => {
        renderComponent();
        expect(screen.getByTestId('header-title')).toHaveTextContent('Save the dress');
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