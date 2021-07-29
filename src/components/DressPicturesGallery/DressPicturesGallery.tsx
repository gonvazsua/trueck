import React, {useEffect, useState} from 'react';
import Grid from "@material-ui/core/Grid";
import {DressPicture} from "../../api/dress/dressAPI";
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import {makeStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

export interface DressDetailsProps {
    dressPictures: DressPicture[] | null | undefined;
};

const DressPicturesGallery = (props: DressDetailsProps): JSX.Element => {

    const classes = useStyles();
    const { dressPictures } = props;
    const [mainPicture, setMainPicture] = useState<DressPicture | null>(null);

    useEffect(() => {
        const mainPictures = dressPictures?.filter(dp => dp.main === true);
        if(mainPictures && mainPictures.length > 0) {
            setMainPicture(mainPictures[0]);
        } else if(dressPictures && dressPictures.length > 0) {
            setMainPicture(dressPictures[0]);
        }
    }, [dressPictures]);

    return (
        <Grid container spacing={3}>
            <Grid item lg={12}>
                <img src={mainPicture?.url} data-testid={'DressPicturesGallery-mainPicture'}/>
            </Grid>
            <Grid item lg={12}>
                <Typography align={"center"}>
                    {dressPictures?.length} imágenes disponibles para este look
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <ImageList rowHeight={250} gap={1} className={classes.imageList}>
                    {dressPictures?.map((item) => (
                        <ImageListItem key={item.url}>
                            <img src={item.url} alt={item.url} />
                            <ImageListItemBar
                                position="top"
                                actionPosition="left"
                                className={classes.titleBar}
                            />
                        </ImageListItem>
                    ))}
                </ImageList>
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    imageList: {
        width: '100%',
        height: 450,
        // Promote the list into its own layer in Chrome. This cost memory, but helps keep FPS high.
        transform: 'translateZ(0)',
    },
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
}));

export default DressPicturesGallery;