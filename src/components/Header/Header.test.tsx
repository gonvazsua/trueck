import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import Header from "./Header";
import React from "react";
import {RecoilRoot} from "recoil";
import {wishListAtom} from "../../common/wishList/wishListAtom";
import {Dress} from "../../api/dress/dressAPI";

describe('Header', () => {

    const childComponent = (
        <div>Mock component</div>
    );

    let wishList: Dress[] = [
        {
            id: 4,
            availableFrom: new Date(),
            description: 'Vestido tirantes midi rojo',
            pictures: [{
                url: 'test',
                main: true
            }],
            price: 108,
            username: 'atonito',
            tags: ['Vestido largo', 'Vestido noche'],
            size: 'M',
            blockingDates: [new Date()]
        }
    ];

    const history = createMemoryHistory();

    const renderComponent = (childComponent: React.ReactNode = null, initialPath: string = '/') => {
        history.push(initialPath);
        return render(
            <RecoilRoot initializeState={
                (snap) => {
                    snap.set(wishListAtom, wishList);
                }
            }>
                <Router history={history}>
                    <Header loginComponent={childComponent}/>
                </Router>
            </RecoilRoot>
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

    test('should render amount of elements in wish list', async () => {
        renderComponent();

        await waitFor(() => expect(screen.getByTestId('header-wishes')).toHaveTextContent('1'));
    });

});