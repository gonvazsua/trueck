import {Dress} from "../../api/dress/dressAPI";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import DressDetails from "./DressDetails";
import Header from "../Header/Header";
import {RecoilRoot} from "recoil";
import {shoppingCartAtom} from "../../common/shoppingCart/shoppingCartAtom";
import React from "react";
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";

describe('DressDetails test', () => {

    const renderComponent = (dress: Dress) => {
        return render(
            <RecoilRoot>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Header loginComponent={<div />} />
                    <DressDetails dress={dress} />
                </MuiPickersUtilsProvider>
            </RecoilRoot>
            )
    };

    const renderComponentWithShoppingCartState = (dress: Dress, shoppingCartDress: Dress) => {
        return render(
            <RecoilRoot initializeState={
                (snap) => {
                    snap.set(shoppingCartAtom, [shoppingCartDress]);
                }
            }>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <Header loginComponent={<div />} />
                    <DressDetails dress={dress} />
                </MuiPickersUtilsProvider>
            </RecoilRoot>
        )
    };

    test('should adds dress to wish list', async () => {

        const dress = {
            id: 4,
            availableFrom: new Date(),
            description: 'Vestido tirantes midi rojo',
            shortDescription: 'Amazona maxi vestido',
            pictures: [{
                url: 'test',
                main: true
            }],
            price: 108,
            originalPrice: 205,
            username: 'atonito',
            tags: ['Vestido largo', 'Vestido noche'],
            size: 'M',
            blockingDates: [new Date()]
        }

        renderComponent(dress);

        act(() => {
            fireEvent.click(screen.getByTestId('DressDetails-addToWishListButton'));
        });

        await waitFor(() => expect(screen.getByTestId('header-wishes')).toHaveTextContent('1'));

    });

    test('should adds dress to shopping cart', async () => {

        const dress = {
            id: 2,
            availableFrom: new Date(),
            description: 'Vestido tirantes midi rojo',
            shortDescription: 'Amazona maxi vestido',
            pictures: [{
                url: 'test',
                main: true
            }],
            price: 108,
            originalPrice: 205,
            username: 'atonito',
            tags: ['Vestido largo', 'Vestido noche'],
            size: 'M',
            blockingDates: [new Date()]
        }

        renderComponent(dress);

        act(() => {
            fireEvent.click(screen.getByTestId('DressDetails-addToShoppingCartButton'));
        });

        await waitFor(() => expect(screen.getByTestId('header-shoppingCart')).toHaveTextContent('1'));

    });

    test('should not add dress to shopping cart if it is already on it', async () => {

        const dress = {
            id: 4,
            availableFrom: new Date(),
            description: 'Vestido tirantes midi rojo',
            shortDescription: 'Amazona maxi vestido',
            pictures: [{
                url: 'test',
                main: true
            }],
            price: 108,
            originalPrice: 205,
            username: 'atonito',
            tags: ['Vestido largo', 'Vestido noche'],
            size: 'M',
            blockingDates: [new Date()]
        }

        renderComponentWithShoppingCartState(dress, dress);

        await waitFor(() => expect(screen.getByTestId('header-shoppingCart')).toHaveTextContent('1'));

        act(() => {
            fireEvent.click(screen.getByTestId('DressDetails-addToShoppingCartButton'));
        });

        await waitFor(() => expect(screen.getByTestId('header-shoppingCart')).toHaveTextContent('1'));

    });

});