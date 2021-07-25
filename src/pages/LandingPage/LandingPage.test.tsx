import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import LandingPage from "./LandingPage";
import {createMemoryHistory} from "history";
import {Router} from "react-router";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import React from "react";
import {Dress, getDresses} from "../../api/dress/dressAPI";
import moment from "moment";
import {AxiosResponse} from "axios";
import {LoginResponse} from "../../api/login/loginAPI";

jest.mock('../../api/dress/dressAPI');
describe('LandingPage test', () => {

    const mockDressList: Dress[] = [
        {
            id: 1,
            availableFrom: new Date(),
            description: 'Amazona maxi vestido estampado selva con cinturon',
            picture: 'https://borow.es/wp-content/uploads/2021/07/BOROW_GUILLESOLA_ECCM_-35.jpg',
            price: 152
        }
    ];

    const history = createMemoryHistory();

    const renderComponent = () => {
        return render(
            <Router history={history}>
                <MuiPickersUtilsProvider utils={MomentUtils}>
                    <LandingPage/>
                </MuiPickersUtilsProvider>
            </Router>
        )
    };

    test('should render component', () => {
        renderComponent();
        expect(screen.getByTestId('landingPage')).toBeInTheDocument();
    });

    test('should call to dress API when search function is called', async() => {

        const date = moment().format('DD/MM/YYYY');
        (getDresses as jest.Mock).mockImplementation(() => {
            return new Promise<AxiosResponse<Dress[]>>((resolve) => {
                const axiosResponse: AxiosResponse = {
                    data: mockDressList,
                    status: 200,
                    statusText: 'OK',
                    config: {},
                    headers: {},
                };
                resolve(axiosResponse);
            });
        });

        renderComponent();

        fireEvent.click(screen.getByTestId('SearchDressForm-search'));

        expect(getDresses).toHaveBeenCalledWith(date, date, '', [0, 200]);

        await waitFor(() => expect(screen.queryByText(mockDressList[0].description)).toBeInTheDocument() );

    });

    test('should render no data message when dress list is empty', async () => {
        (getDresses as jest.Mock).mockImplementation(() => {
            return new Promise<AxiosResponse<Dress[]>>((resolve) => {
                const axiosResponse: AxiosResponse = {
                    data: new Array<Dress>(),
                    status: 200,
                    statusText: 'OK',
                    config: {},
                    headers: {},
                };
                resolve(axiosResponse);
            });
        });

        renderComponent();

        act(() => {
            fireEvent.click(screen.getByTestId('SearchDressForm-search'));
        })

        await waitFor(() => {
            expect(screen.getByTestId('SearchDressForm-noResults')).toBeInTheDocument();
        });
    });

});