import {Dress} from "../../api/dress/dressAPI";
import {createMemoryHistory} from "history";
import React from "react";
import {render, screen} from "@testing-library/react";
import {RecoilRoot} from "recoil";
import {Router} from "react-router";
import {shoppingCartAtom} from "../../common/shoppingCart/shoppingCartAtom";
import ShoppingCartPage from "./ShoppingCartPage";

describe('ShoppingCartPageTest', () => {

    let shoppingCartDresses: Dress[] = [
        {
            id: 4,
            availableFrom: new Date(),
            description: 'Vestido tirantes midi rojo',
            pictures: [{
                url: 'test',
                main: true
            }],
            price: 108,
            originalPrice: 200,
            username: 'atonito',
            tags: ['Vestido largo', 'Vestido noche'],
            size: 'M',
            blockingDates: [new Date()]
        },
        {
            id: 1,
            availableFrom: new Date(),
            description: 'Vestido tirantes midi azul',
            pictures: [{
                url: 'test2',
                main: false
            }],
            price: 125,
            originalPrice: 180,
            username: 'atonito',
            tags: ['Vestido largo', 'Vestido noche'],
            size: 'M',
            blockingDates: [new Date()]
        }
    ];

    const history = createMemoryHistory();

    const renderComponent = (dresses: Dress[]) => {
        return render(
            <RecoilRoot initializeState={
                (snap) => {
                    snap.set(shoppingCartAtom, dresses);
                }
            }>
                <Router history={history}>
                    <ShoppingCartPage />
                </Router>
            </RecoilRoot>
        );
    };

    test('should render the Shopping Cart page', () => {
        renderComponent(shoppingCartDresses);
        expect(screen.getByTestId('ShoppingCartPage-title')).toHaveTextContent('Revisa tus looks');
    });

    test('should render the shopping cart dresses', async () => {
        renderComponent(shoppingCartDresses);
        expect(screen.queryAllByTestId(/ShoppingCartPage-dress-/)).toHaveLength(shoppingCartDresses.length);
    });

    test('should render empty cart message when no dresses in cart', async () => {
        renderComponent([]);
        expect(screen.queryAllByTestId(/ShoppingCartPage-dress-/)).toHaveLength(0);
        expect(screen.getByTestId('ShoppingCartPage-emptyCart')).toBeInTheDocument();
    });

});