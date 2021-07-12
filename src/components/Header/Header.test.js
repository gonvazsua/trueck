import {render, screen} from "@testing-library/react";
import Header from "./Header";

describe('Header', () => {

    const childComponent = (
        <div>Mock component</div>
    );

    const renderComponent = (childComponent = null) => {
        return render(
            <Header login={childComponent}/>
        );
    };

    test('should render the Header', () => {
        renderComponent();
        expect(screen.getByTestId('header-menuIcon')).toBeInTheDocument();
        expect(screen.getByTestId('header-title')).toHaveTextContent('Trueck');
    });

    test('should render child component', () => {
        renderComponent(childComponent);
        expect(screen.queryByText(/Mock component/i)).toBeInTheDocument();
    });

});