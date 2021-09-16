import React, {useState} from 'react';
import {makeStyles} from "@material-ui/core";
import moment from "moment/moment";
import Grid from "@material-ui/core/Grid";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";
import {KeyboardDatePicker} from "@material-ui/pickers";
import {checkAvailability} from "../../api/dress/dressAPI";
import Typography from "@material-ui/core/Typography";

export interface DressAvailabilityCalendarProps {
    dressId: number;
    dateSelectedFn: (selectedDate: Date | undefined) => void;
    isDressAvailableFn: (selectedDate: Boolean | undefined) => void;
};

const DressAvailabilityCalendar = (props: DressAvailabilityCalendarProps): JSX.Element => {

    const { dressId, dateSelectedFn, isDressAvailableFn } = props;
    const classes = useStyles();
    const [availabilityDate, setAvailabilityDate] = useState<Date>(new Date());
    const [isAvailable, setIsAvailable] = useState<Boolean | undefined>(undefined);

    const handleChangeAvailabilityDate = async (date: string | null | undefined) => {
        if(date) {
            const availability = moment(date, 'DD/MM/yyyy').toDate();
            setAvailabilityDate(availability);
            try{
                const isAvailableResponse =  await checkAvailability(dressId, availability);
                setIsAvailable(isAvailableResponse.data.isAvailable);
                if(isAvailableResponse.data.isAvailable) {
                    dateSelectedFn(availability);
                } else {
                    dateSelectedFn(undefined);
                }
                isDressAvailableFn(isAvailableResponse.data.isAvailable);
            } catch (error) {
            }
        }
    };

    const printNotAvailableMessage = () => {
        return (
            <Typography
                variant={'caption'}
                color={'error'}
                data-testid={'DressAvailabilityCalendar-not-available-msg'}
            >
                No disponible para la fecha seleccionada
            </Typography>
        )
    };

    const printAvailableMessage = () => {
        return (
            <Typography
                variant={'caption'}
                color={'primary'}
                data-testid={'DressAvailabilityCalendar-available-msg'}
            >
                Bien! El vestido está disponible
            </Typography>
        )
    };

    return (
        <div className={classes.availability}>
            <Grid container spacing={3}>
                <Grid item lg={6}>
                    <KeyboardDatePicker format={'DD/MM/yyyy'}
                                        KeyboardButtonProps={{
                                            "aria-label": "change date",
                                            ...({ ["data-testid"]: "DressAvailabilityCalendar-date-btn" } as any),
                                        }}
                                        minDate={new Date()}
                                        emptyLabel={'DD/MM/YYYY'} value={availabilityDate}
                                        onChange={(date: MaterialUiPickersDate, value: string | null | undefined) => handleChangeAvailabilityDate(value)}/>
                </Grid>
                <Grid item lg={6}>
                    { isAvailable === false && printNotAvailableMessage() }
                    { isAvailable === true && printAvailableMessage() }
                </Grid>
            </Grid>
        </div>
    )
};

export default DressAvailabilityCalendar;

const useStyles = makeStyles((theme) => ({
    availability: {
        marginTop: '1rem',
        paddingBottom: '1rem',
        textAlign: 'left',
    },
}));