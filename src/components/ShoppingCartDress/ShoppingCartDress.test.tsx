import React from "react";
import {Dress} from "../../api/dress/dressAPI";
import ShoppingCartDress from "./ShoppingCartDress";
import {screen} from "@testing-library/react";

describe('LandingPage test', () => {

    const renderComponent = (dress: Dress) => {
        return <ShoppingCartDress dress={dress} />;
    };

    test('should render the dress received as parameter', () => {

        const dress: Dress = {
            id: 1,
            availableFrom: new Date(),
            description: 'Amazona maxi vestido estampado selva con cinturon',
            shortDescription: 'Amazona maxi vestido',
            pictures: [
                {
                    main: true,
                    url: 'test'
                }
            ],
            price: 152,
            originalPrice: 100,
            username: 'username',
            tags: ['test'],
            size: 'M',
            blockingDates: [new Date()]
        };

        renderComponent(dress);


    });

});