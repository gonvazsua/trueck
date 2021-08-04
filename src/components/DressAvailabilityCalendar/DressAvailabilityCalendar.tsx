import React from 'react';
import {Chip, makeStyles} from "@material-ui/core";
import moment from "moment/moment";

export interface DressAvailabilityCalendarProps {
    blockingDates?: Date[];
};

const DressAvailabilityCalendar = (props: DressAvailabilityCalendarProps): JSX.Element => {

    const { blockingDates } = props;
    const classes = useStyles();
    const yesterday = moment(new Date()).subtract(1, 'days').toDate();

    return (
        <div>
            {blockingDates &&
                blockingDates
                    .map(date => moment(date))
                    .filter(date => date.isAfter(yesterday))
                    .map(date => date.format('DD/MM/YYYY'))
                    .map(date => (
                        <Chip label={date} variant={'outlined'} color={'secondary'} key={date} className={classes.availability}/>
                    ))
            }
        </div>
    )
};

export default DressAvailabilityCalendar;

const useStyles = makeStyles((theme) => ({
    availability: {
        marginRight: '0.5rem',
        marginTop: '1rem',
    },
}));