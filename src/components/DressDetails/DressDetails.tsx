import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Dress} from "../../api/dress/dressAPI";
import DressTags from "../DressTags/DressTags";
import {makeStyles} from "@material-ui/core";
import SizeSelector from "../SizeSelector/SizeSelector";
import DressAvailabilityCalendar from "../DressAvailabilityCalendar/DressAvailabilityCalendar";
import Button from "@material-ui/core/Button";
import {ContactMail, Favorite} from "@material-ui/icons";

export interface DressDetailsProps {
    dress: Dress;
};

const DressDetails = (props: DressDetailsProps): JSX.Element => {

    const { dress } = props;
    const classes = useStyles();

    return (
        <Grid container spacing={3}>
            <Grid item lg={12}>
                <Typography variant={'h5'} className={classes.owner}>
                    Look de <span className={classes.username}>@{dress.username}</span>
                </Typography>
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'h6'} color={'secondary'}>
                    {dress.price} EUR
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Grid item lg={1}>
                    <Typography variant={'subtitle1'}>
                        TALLA
                    </Typography>
                </Grid>
                <Grid item lg={11}>
                    <SizeSelector selectedSize={dress.size} />
                </Grid>
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'subtitle1'}>
                    {dress.description}
                </Typography>
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'subtitle1'}>
                    CATEGORIAS
                </Typography>
                <DressTags tags={dress.tags} />
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'subtitle1'}>
                    FECHAS NO DISPONIBLES
                </Typography>
                <DressAvailabilityCalendar blockingDates={dress.blockingDates}/>
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Button variant={'contained'} size={'large'} disableElevation startIcon={<ContactMail />} fullWidth>
                    CONTACTAR CON EL USUARIO
                </Button>
                <Button variant={'outlined'} size={'large'} disableElevation startIcon={<Favorite />} fullWidth className={classes.actionButtons}>
                    AÑADIR A LA LISTA DE DESEOS
                </Button>
            </Grid>
            <Grid item lg={12}>
            </Grid>

        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    owner: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        letterSpacing: '.2em',
    },
    username: {
        letterSpacing: '0em',
    },
    separator: {
        color: '#DEDEDE',
        borderTopColor: '#DEDEDE',
        borderRightColor: '#DEDEDE',
        borderBottomColor: '#DEDEDE',
        borderLeftColor: '#DEDEDE',
        backgroundColor: '#DEDEDE',
    },
    size: {
        display: 'flex'
    },
    actionButtons: {
        marginTop: '0.5rem',
    }
}));

export default DressDetails;