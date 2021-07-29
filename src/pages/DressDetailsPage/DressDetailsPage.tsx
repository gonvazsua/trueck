import React from 'react';
import Grid from "@material-ui/core/Grid";
import DressPicturesGallery from "../../components/DressPicturesGallery/DressPicturesGallery";

const DressDetailsPage = (): JSX.Element => {

    return (
        <Grid container spacing={3}>
            <Grid item lg={6}>
                <DressPicturesGallery />
            </Grid>
            <Grid item lg={6}>
                {/*<DressDetails />*/}
            </Grid>
        </Grid>
    );
};

export default DressDetailsPage;