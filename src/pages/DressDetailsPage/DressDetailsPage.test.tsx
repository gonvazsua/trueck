import {render, screen} from "@testing-library/react";
import React from "react";
import DressDetailsPage from "./DressDetailsPage";

jest.mock('../../api/dress/dressAPI');
describe('LandingPage test', () => {

    const renderComponent = () => {
        return render(
            <DressDetailsPage/>
        )
    };

    test('should render component', () => {
        renderComponent();
        expect(screen.getByTestId('landingPage')).toBeInTheDocument();
    });

});