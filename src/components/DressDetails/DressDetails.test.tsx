import {Dress} from "../../api/dress/dressAPI";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import DressDetails from "./DressDetails";
import Header from "../Header/Header";
import {RecoilRoot} from "recoil";

describe('DressDetails test', () => {

    const renderComponent = (dress: Dress) => {
        return render(
            <RecoilRoot>
                <Header loginComponent={<div />} />
                <DressDetails dress={dress} />
            </RecoilRoot>
            )
    };

    test('should adds dress to wish list', async () => {

        const dress = {
            id: 4,
            availableFrom: new Date(),
            description: 'Vestido tirantes midi rojo',
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
            id: 4,
            availableFrom: new Date(),
            description: 'Vestido tirantes midi rojo',
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

});