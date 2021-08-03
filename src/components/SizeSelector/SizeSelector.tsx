import Grid from "@material-ui/core/Grid";
import {makeStyles} from "@material-ui/core";

export interface SizeSelectorProps {
    selectedSize: string;
};

const SizeSelector = (props: SizeSelectorProps): JSX.Element => {

    const classes = useStyles();
    const { selectedSize } = props;

    const getClassBySize = (size: string) => {
        return size === selectedSize
            ? classes.selectedSize
            : classes.size;
    };

    return (
        <Grid container spacing={1} className={classes.sizeSelector}>
            <Grid item xs={1} lg={1} xl={1} className={getClassBySize('XS')}>
                XS
            </Grid>
            <Grid item xs={1} lg={1} xl={1} className={getClassBySize('S')}>
                S
            </Grid>
            <Grid item xs={1} lg={1} xl={1} className={getClassBySize('M')}>
                M
            </Grid>
            <Grid item xs={1} lg={1} xl={1} className={getClassBySize('L')}>
                L
            </Grid>
            <Grid item xs={1} lg={1} xl={1} className={getClassBySize('XL')}>
                XL
            </Grid>
        </Grid>
    );
};

const useStyles = makeStyles((theme) => ({
    size: {
        textAlign: 'center',
    },
    selectedSize: {
        border: 'solid 1px',
        textAlign: 'center'
    },
    sizeSelector: {
        marginTop: '1rem'
    },
}));

export default SizeSelector;