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

export interface DressForGridProps {
    dress: Dress;
};

const DressForGrid = (props: DressForGridProps): JSX.Element => {

    const history = useHistory();
    const classes = useStyles();
    const {dress} = props;

    const handleDressDetailsClick = () => {
        history.push('dress-details', dress);
    };

    return (
        <Card data-testid={'dressForGrid-dress-' + dress.id}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={dress.picture}
                    title={dress.description}
                    data-testid={'dressForGrid-dressPicture-' + dress.id}
                    onClick={() => handleDressDetailsClick()}
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