import {render, screen, waitFor} from "@testing-library/react";
import DressAvailabilityCalendar from "./DressAvailabilityCalendar";
import moment from "moment/moment";

describe('DressAvailabilityCalendar test', () => {

    const renderComponent = (dates: Date[]) => {
        return render(<DressAvailabilityCalendar blockingDates={dates}/>)
    };

    test('should render list of dates', async () => {

        const today = new Date();
        const todayString = moment(today).format('DD/MM/YYYY');

        const dates = [
            new Date()
        ];

        renderComponent(dates);

        const regExp = new RegExp(todayString, 'i');

        await waitFor(() => expect(screen.queryAllByText(regExp)).toHaveLength(1));
    });



    test('should not render past dates', async () => {

        const today = new Date();
        const yesterday = moment(new Date()).subtract(1, 'days').toDate();
        const todayString = moment(today).format('DD/MM/YYYY');
        const yesterdayString = moment(yesterday).format('DD/MM/YYYY');

        const dates = [
            today,
            yesterday
        ];

        renderComponent(dates);

        const regExpToday = new RegExp(todayString, 'i');
        const regExpYesterday = new RegExp(yesterdayString, 'i');

        await waitFor(() => expect(screen.queryAllByText(regExpToday)).toHaveLength(1));
        await waitFor(() => expect(screen.queryAllByText(regExpYesterday)).toHaveLength(0));
    });

});