import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Dress} from "../../api/dress/dressAPI";
import DressTags from "../DressTags/DressTags";
import {makeStyles} from "@material-ui/core";
import {Checkroom} from "@material-ui/icons";

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
                <Typography variant={'h6'}>
                    € {dress.price}
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'body1'} className={classes.size}>
                    <Checkroom />
                    Talla {dress.size}
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'subtitle1'}>
                    {dress.description}
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <DressTags tags={dress.tags} />
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
}));

export default DressDetails;