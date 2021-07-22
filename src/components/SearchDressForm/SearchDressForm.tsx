import React from 'react';
import {KeyboardDatePicker} from '@material-ui/pickers';
import Grid from "@material-ui/core/Grid";
import {FormControl, InputLabel, makeStyles, MenuItem, Select, Slider} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const SearchDressForm = (): JSX.Element => {

    const classes = useStyles();

    return (
        <Grid container  data-testid='searchDressForm'>
            <Grid item xs={12}>
                <Typography variant={'h4'} className={classes.searchFormTitle}>ENCUENTRA TU LOOK</Typography>
            </Grid>
            <Grid item xs={12} lg={3}>
                <KeyboardDatePicker label="Fecha desde" format={'DD/MM/yyyy'} minDate={new Date()} className={classes.with90}
                                    emptyLabel={'DD/MM/YYYY'} value={new Date()} onChange={() => {
                }}/>
            </Grid>
            <Grid item xs={12} lg={3}>
                <KeyboardDatePicker label="Fecha hasta" format={'DD/MM/yyyy'} minDate={new Date()} className={classes.with90}
                                    emptyLabel={'DD/MM/YYYY'} value={new Date()} onChange={() => {
                }}/>
            </Grid>
            <Grid item xs={12} lg={3}>
                <FormControl className={classes.with90}>
                    <InputLabel id="demo-simple-select-helper-label">Tipo de prenda</InputLabel>
                    <Select
                        value={null}
                        onChange={() => {}}
                    >
                        <MenuItem value=''>
                            <em>Todos</em>
                        </MenuItem>
                        <MenuItem value={10}>Vestido largo</MenuItem>
                        <MenuItem value={20}>Vestido corto</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} lg={3}>
                <FormControl className={classes.with90}>
                    <Typography id="range-slider" gutterBottom>
                        Rango de precio
                    </Typography>
                    <Slider
                        value={20}
                        onChange={() => {}}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        color={'secondary'}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <Typography align={'left'} className={classes.mt3}>
                    <Button variant="outlined" size="large">BUSCAR</Button>
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