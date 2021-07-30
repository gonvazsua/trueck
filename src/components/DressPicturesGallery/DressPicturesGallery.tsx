import React from 'react';
import Grid from "@material-ui/core/Grid";
import {DressPicture} from "../../api/dress/dressAPI";
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-material-ui-carousel";

export interface DressDetailsProps {
    dressPictures: DressPicture[] | null | undefined;
};

const DressPicturesGallery = (props: DressDetailsProps): JSX.Element => {

    const classes = useStyles();
    const {dressPictures} = props;

    return (
        <Grid container spacing={3}>
            <Grid item lg={12}>
                <Carousel autoPlay={false}>
                    {
                        dressPictures?.map((item, i) =>
                            <img key={'DressPicturesGallery-picture-' + item.name}
                                 src={item.url}
                                 alt={item.url}
                                 className={classes.picture}
                                 data-testid={'DressPicturesGallery-picture-' + item.name}
                            />)
                    }
                </Carousel>
            </Grid>
            <Grid item lg={12}>
                <Typography align={"center"}>
                    {dressPictures?.length} imágenes disponibles para este look
                </Typography>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    picture: {
        width: '100%',
        height: 'auto',
    }
}));

export default DressPicturesGallery;