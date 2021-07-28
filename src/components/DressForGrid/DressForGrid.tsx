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

export interface DressForGridProps {
    dress: Dress;
};

const DressForGrid = (props: DressForGridProps): JSX.Element => {

    const classes = useStyles();
    const {dress} = props;

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={dress.picture}
                    title={dress.description}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {dress.price} €
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {dress.description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="secondary">
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