import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Dress} from "../../api/dress/dressAPI";

export interface DressDetailsProps {
    dress: Dress;
};

const DressDetails = (props: DressDetailsProps): JSX.Element => {

    const { dress } = props;

    return (
        <Grid container spacing={3}>
            <Grid item lg={12}>
                <Typography variant={'h5'}>
                    Look de @{dress.username}
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'body1'}>
                    {dress.description}
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'body1'}>
                    Precio {dress.price}€
                </Typography>
            </Grid>
        </Grid>
    );
};

export default DressDetails;