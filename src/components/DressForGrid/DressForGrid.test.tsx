import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import DressForGrid from "./DressForGrid";
import {Dress} from "../../api/dress/dressAPI";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import React from "react";
import {Route} from "react-router-dom";

describe('DressForGrid test', () => {

    const history = createMemoryHistory();

    const renderComponent = (dress: Dress) => {
        return render(
            <Router history={history}>
                <DressForGrid dress={dress}/>
            </Router>
        );
    };

    test('Should navigate to dress details page when clicking on dress details button', async () => {
        const dress: Dress = {
            id: 1,
            availableFrom: new Date(),
            description: 'Amazona maxi vestido estampado selva con cinturon',
            picture: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-35.jpg',
            price: 152
        };
        renderComponent(dress);

        act(() => {
            fireEvent.click(screen.getByTestId('dressForGrid-dressDetails-' + dress.id))
        });

        await waitFor(() => expect(history.location.pathname).toEqual('dress-details'));

    });

    test('Should navigate to dress details page when clicking on dress picture', async () => {
        const dress: Dress = {
            id: 1,
            availableFrom: new Date(),
            description: 'Amazona maxi vestido estampado selva con cinturon',
            picture: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-35.jpg',
            price: 152
        };
        renderComponent(dress);

        act(() => {
            fireEvent.click(screen.getByTestId('dressForGrid-dressPicture-' + dress.id))
        });

        await waitFor(() => expect(history.location.pathname).toEqual('dress-details'));

    });

});