import React, {useState} from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import Grid from "@material-ui/core/Grid";
import {FormControl, InputLabel, makeStyles, MenuItem, Select, Slider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import moment from "moment/moment";
import {MaterialUiPickersDate} from "@material-ui/pickers/typings/date";

export interface SearchDressFormProps {
    searchFunction: Function
};

const SearchDressForm = (props: SearchDressFormProps): JSX.Element => {

    const {searchFunction} = props;
    const classes = useStyles();
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());
    const [dressType, setDressType] = useState('');
    const [priceRange, setPriceRange] = useState([0, 200]);

    const handleChangeDateFrom = (from: string | null | undefined) => {
        if(from) {
            const date = moment(from).toDate();
            setDateFrom(date);
        }
    }

    const handleChangeDateTo = (to: string | null | undefined) => {
        if(to) {
            const date = moment(to).toDate();
            setDateTo(date);
        }
    }

    const handleDressType = (event: React.ChangeEvent<{ value: unknown }>) => {
        setDressType(String(event.target.value));
    };

    const handlePriceRangeChange = (value: number | number[]) => {
        if(value instanceof Array) {
            const values = value as number[];
            setPriceRange(values);
        }
    };

    const handleClickSearch = () => {
        const dateFromToSearch = moment(dateFrom).format('DD/MM/YYYY');
        const dateToToSearch = moment(dateTo).format('DD/MM/YYYY');
        searchFunction(dateFromToSearch, dateToToSearch, dressType, priceRange);
    };

    return (
        <Grid container  data-testid='searchDressForm'>
            <Grid item xs={12}>
                <Typography variant={'h4'} className={classes.searchFormTitle}>ENCUENTRA TU LOOK</Typography>
            </Grid>
            <Grid item xs={12} lg={3}>
                <KeyboardDatePicker label="Fecha desde" format={'DD/MM/yyyy'} data-testid={'SearchDressForm-dateFrom'} minDate={new Date()} className={classes.with90}
                                    emptyLabel={'DD/MM/YYYY'} value={dateFrom} onChange={(date: MaterialUiPickersDate, value: string | null | undefined) => handleChangeDateFrom(value)}/>
            </Grid>
            <Grid item xs={12} lg={3}>
                <KeyboardDatePicker label="Fecha hasta" format={'DD/MM/yyyy'} data-testid={'SearchDressForm-dateTo'} minDate={new Date()} className={classes.with90}
                                    emptyLabel={'DD/MM/YYYY'} value={dateTo} onChange={(date: MaterialUiPickersDate, value: string | null | undefined) => handleChangeDateTo(value)}/>
            </Grid>
            <Grid item xs={12} lg={3}>
                <FormControl className={classes.with90}>
                    <InputLabel id="dressType-helper-label">Tipo de prenda</InputLabel>
                    <Select
                        value={dressType}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => handleDressType(event)}
                        data-testid={'SearchDressForm-dressType'}
                    >
                        <MenuItem value=''>
                            <em>Todos</em>
                        </MenuItem>
                        <MenuItem value={'Vestido largo'}>Vestido largo</MenuItem>
                        <MenuItem value={'Vestido corto'}>Vestido corto</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} lg={3}>
                <FormControl className={classes.with90}>
                    <Typography id="range-slider" gutterBottom>
                        Rango de precio
                    </Typography>
                    <Slider
                        value={priceRange}
                        onChange={(event: object, value: number | number[]) => handlePriceRangeChange(value)}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        color={'secondary'}
                        data-testid={'SearchDressForm-priceRange'}
                        max={1000}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography align={'left'} className={classes.mt3}>
                    <Button variant="outlined" data-testid={'SearchDressForm-search'} size="large" onClick={() => handleClickSearch()}>BUSCAR</Button>
                </Typography>
            </Grid>
        </Grid>
    );

};

export default SearchDressForm;

const useStyles = makeStyles((theme) => ({
    with90: {
        width: '90%'
    },
    searchFormTitle: {
        textTransform: 'uppercase',
        marginBottom: '3rem',
    },
    mr10: {
        marginRight: '10%'
    },
    mt3: {
        marginTop: '3%'
    }
}));