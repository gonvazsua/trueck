import {render, screen} from "@testing-library/react";
import Header from "./Header";

describe('Header', () => {

    const renderComponent = () => {
        return render(<Header />);
    };

    test('should render the Header', () => {

        renderComponent();
        expect(screen.getByTestId('header-menuIcon')).toBeInTheDocument();
        expect(screen.getByTestId('header-title')).toHaveTextContent('Trueck');

    });

});