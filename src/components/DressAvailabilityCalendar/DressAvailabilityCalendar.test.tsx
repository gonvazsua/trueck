import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import DressAvailabilityCalendar from "./DressAvailabilityCalendar";
import {checkAvailability, DressAvailabilityResponse} from "../../api/dress/dressAPI";
import MomentUtils from "@date-io/moment";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import React from "react";
import moment from "moment/moment";
import {AxiosResponse} from "axios";

jest.mock('../../api/dress/dressAPI');
describe('DressAvailabilityCalendar test', () => {

    beforeEach(() => {
        jest.restoreAllMocks();
    });

    const renderComponent = (dressId: number, setDateFunction?: () => void, setDressAvailableFunction?: () => void) => {
        const dateFunction  = setDateFunction ? setDateFunction : () => {};
        const availabilityFunction  = setDressAvailableFunction ? setDressAvailableFunction : () => {};
        return render(
            <MuiPickersUtilsProvider utils={MomentUtils}>
                <DressAvailabilityCalendar dressId={dressId} dateSelectedFn={dateFunction} isDressAvailableFn={availabilityFunction} />
            </MuiPickersUtilsProvider>
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

    test('should call to availability API on date change', async () => {

        const tomorrow = moment().add(1,'days');
        const dressId = 1;

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

        renderComponent(dressId);

        await selectCalendarDate(tomorrow.date());

        await waitFor(() => expect(checkAvailability).toBeCalled());

    });

    test('should not show availability message when loading the page', async () => {
        const dressId = 1;

        renderComponent(dressId);

        expect(screen.queryAllByTestId(/DressAvailabilityCalendar-availabiity-message/)).toHaveLength(0);
    });

    test('should show availability success message when dress is available by date', async () => {
        const dressId = 1;
        const tomorrow = moment().add(1,'days');

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

        renderComponent(dressId);

        await selectCalendarDate(tomorrow.date());

        await waitFor(() => expect(screen.getByTestId('DressAvailabilityCalendar-available-msg')).toBeInTheDocument(), { interval: 1000 });
    });

    test('should show not available message when dress is not available by date', async () => {
        const dressId = 1;
        const tomorrow = moment().add(1,'days');

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

        renderComponent(dressId);

        await selectCalendarDate(tomorrow.date());

        await waitFor(() => expect(screen.getByTestId('DressAvailabilityCalendar-not-available-msg')).toBeInTheDocument(), { interval: 1000 });
    });

    test('should call to callback function when date is selected and available', async () => {
        const dressId = 1;
        const tomorrow = moment().add(1,'days');
        const setDateFunction = jest.fn();
        const setDressAvailableFunction = jest.fn();

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

        renderComponent(dressId, setDateFunction, setDressAvailableFunction);
        await selectCalendarDate(tomorrow.date());
        expect(setDateFunction).toHaveBeenCalled();
        expect(setDressAvailableFunction).toHaveBeenCalledWith(true);
    });

    test('should call to callback function when date is selected and not available', async () => {
        const dressId = 1;
        const tomorrow = moment().add(1,'days');
        const setDateFunction = jest.fn();
        const setDressAvailableFunction = jest.fn();

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

        renderComponent(dressId, setDateFunction, setDressAvailableFunction);
        await selectCalendarDate(tomorrow.date());
        expect(setDateFunction).toHaveBeenCalled();
        expect(setDressAvailableFunction).toHaveBeenCalledWith(false);
    });

});