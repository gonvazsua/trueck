import {checkAvailability, Dress, DressAvailabilityResponse, ShoppingCartDress} from "../../api/dress/dressAPI";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import DressDetails from "./DressDetails";
import Header from "../Header/Header";
import {RecoilRoot} from "recoil";
import {shoppingCartAtom} from "../../common/shoppingCart/shoppingCartAtom";
import React from "react";
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import moment from "moment/moment";
import {AxiosResponse} from "axios";

jest.mock('../../api/dress/dressAPI');
describe('DressDetails test', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

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

    const renderComponentWithShoppingCartState = (dress: Dress, shoppingCartDress: ShoppingCartDress) => {
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

    const selectCalendarDate = async (calendarDay: number) => {
        const calendar = await waitFor(() => screen.getByTestId('DressAvailabilityCalendar-date-btn'));
        await fireEvent.click(calendar);
        await act(async () => {
            await fireEvent.click(calendar);
            await fireEvent.click(screen.getByText(calendarDay));
            await fireEvent.click(screen.getByText('OK'));
        });
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

    test('should enable add to cart button when the dress is available by date', async () => {

        const tomorrow = moment().add(1,'days');
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
        };

        (checkAvailability as jest.Mock).mockImplementation(() => {
            return new Promise<AxiosResponse<DressAvailabilityResponse>>((resolve) => {
                const axiosResponse: AxiosResponse = {
                    data: {isAvailable: true},
                    status: 200,
                    statusText: 'OK',
                    config: {},
                    headers: {},
                };
                resolve(axiosResponse);
            });
        });

        renderComponent(dress);
        await selectCalendarDate(tomorrow.date());
        expect(screen.getByTestId('DressDetails-addToShoppingCartButton')).toBeEnabled();

    });

    test('should disable add to cart button when the dress is not available by date', async () => {

        const tomorrow = moment().add(1,'days');
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
        };

        (checkAvailability as jest.Mock).mockImplementation(() => {
            return new Promise<AxiosResponse<DressAvailabilityResponse>>((resolve) => {
                const axiosResponse: AxiosResponse = {
                    data: {isAvailable: false},
                    status: 200,
                    statusText: 'OK',
                    config: {},
                    headers: {},
                };
                resolve(axiosResponse);
            });
        });

        renderComponent(dress);
        await selectCalendarDate(tomorrow.date());
        expect(screen.getByTestId('DressDetails-addToShoppingCartButton')).toBeDisabled();

    });

    test('should adds dress to shopping cart', async () => {
        const tomorrow = moment().add(1,'days');
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
        };

        (checkAvailability as jest.Mock).mockImplementation(() => {
            return new Promise<AxiosResponse<DressAvailabilityResponse>>((resolve) => {
                const axiosResponse: AxiosResponse = {
                    data: {isAvailable: true},
                    status: 200,
                    statusText: 'OK',
                    config: {},
                    headers: {},
                };
                resolve(axiosResponse);
            });
        });

        renderComponent(dress);
        await selectCalendarDate(tomorrow.date());

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

        const shoppingCartDress = {
            dress: dress,
            date: new Date()
        };

        renderComponentWithShoppingCartState(dress, shoppingCartDress);

        await waitFor(() => expect(screen.getByTestId('header-shoppingCart')).toHaveTextContent('1'));

        act(() => {
            fireEvent.click(screen.getByTestId('DressDetails-addToShoppingCartButton'));
        });

        await waitFor(() => expect(screen.getByTestId('header-shoppingCart')).toHaveTextContent('1'));

    });

});