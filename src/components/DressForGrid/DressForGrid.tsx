import React from 'react';
import {Dress} from "../../api/dress/dressAPI";
import {
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    makeStyles,
    Typography
} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import DressTags from "../DressTags/DressTags";
import Grid from "@material-ui/core/Grid";

export interface DressForGridProps {
    dress: Dress;
};

const DressForGrid = (props: DressForGridProps): JSX.Element => {

    const history = useHistory();
    const classes = useStyles();
    const {dress} = props;

    const handleDressDetailsClick = () => {
        history.push(`dress-details/${dress.id}`);
    };

    const getMainDressPictureUrl = () => {
        const urls: string[] = dress.pictures
            .filter(picture => picture.main === true)
            .map(picture => picture.url);
        return urls.length === 0
            ? dress.pictures[0].url
            : urls[0];
    };

    return (
        <Card data-testid={'dressForGrid-dress-' + dress.id}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={getMainDressPictureUrl()}
                    title={dress.description}
                    data-testid={'dressForGrid-dressPicture-' + dress.id}
                    onClick={() => handleDressDetailsClick()}
                />
                <CardContent>
                    <Grid item xs={12} xl={12} md={12}>
                        <Typography gutterBottom variant="h5" component="h2">
                            {dress.price} €
                        </Typography>
                    </Grid>
                    <Grid item xs={12} xl={12} md={12}>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {dress.description}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} xl={12} md={12}>
                        <DressTags tags={dress.tags} />
                    </Grid>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="secondary" data-testid={'dressForGrid-dressDetails-' + dress.id} onClick={() => handleDressDetailsClick()}>
                    DETALLES
                </Button>
                <Button size="small" color="secondary">
                    LO QUIERO
                </Button>
            </CardActions>
        </Card>
    );
};

export default DressForGrid;

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 600,
    },
}));