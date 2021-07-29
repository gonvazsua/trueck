import {render, screen, waitFor} from "@testing-library/react";
import React from "react";
import {MemoryRouter} from "react-router-dom";
import DressDetailsPage from "./DressDetailsPage";
import {Dress, getDressById} from "../../api/dress/dressAPI";
import {RecoilRoot} from "recoil";
import {AxiosResponse} from "axios";

jest.mock('../../api/dress/dressAPI');
describe('LandingPage test', () => {

    const renderComponent = () => {

        return render(
            <RecoilRoot>
                <MemoryRouter>
                    <DressDetailsPage/>`
                </MemoryRouter>
            </RecoilRoot>
        )
    };

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    test('should render component', () => {
        renderComponent();
        expect(screen.getByTestId('DressDetailsPage-root')).toBeInTheDocument();
    });

    test('should load dress by id', () => {
        renderComponent();
        expect(getDressById).toBeCalled();
    });

    test('should render error message when the dress to load does not exist', async () => {

        (getDressById as jest.Mock).mockImplementation(() => {
            return new Promise<AxiosResponse<Dress>>((resolve) => {
                const axiosResponse: AxiosResponse = {
                    data: null,
                    status: 404,
                    statusText: 'Not found',
                    config: {},
                    headers: {},
                };
                resolve(axiosResponse);
            });
        });

        renderComponent();
        await waitFor(() => expect(getDressById).toBeCalled());
        await waitFor(() => expect(screen.getByTestId('DressDetailsPage-noDressError')).toBeInTheDocument());
    });

    test('should render dress details when the dress to load exists', async () => {

        (getDressById as jest.Mock).mockImplementation(() => {
            return new Promise<AxiosResponse<Dress>>((resolve) => {
                const axiosResponse: AxiosResponse = {
                    data: {id: 1, availableFrom: new Date(), description: 'Amazona maxi vestido estampado selva con cinturon', pictures: [{url: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-35.jpg', main:true}], price: 152},
                    status: 200,
                    statusText: 'Not found',
                    config: {},
                    headers: {},
                };
                resolve(axiosResponse);
            });
        });

        renderComponent();
        await waitFor(() => expect(getDressById).toBeCalled());
        await waitFor(() => expect(screen.getByTestId('DressDetailsPage-dressDetails')).toBeInTheDocument());
    });

});