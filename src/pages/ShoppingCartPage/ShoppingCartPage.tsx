import React from "react";
import {useRecoilState} from "recoil";
import {shoppingCartAtom} from "../../common/shoppingCart/shoppingCartAtom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core";
import ShoppingCartDress from "../../components/ShoppingCartDress/ShoppingCartDress";

const ShoppingCartPage = (): JSX.Element => {

    const [shoppingCartDresses, setShoppingCartDresses] = useRecoilState(shoppingCartAtom);
    const classes = useStyles();

    const renderShoppingCartDresses = () => {
        return (
            shoppingCartDresses.map(cartDress => (
                    <Grid item lg={12} data-testid={`ShoppingCartPage-dress-${cartDress.dress.id}`} key={cartDress.dress.id}>
                        <ShoppingCartDress dress={cartDress.dress} key={cartDress.dress.id}/>
                    </Grid>
                )
            )
        );
    };

    const renderEmptyCartMessage = () => {
        return (
            <Grid item lg={12} data-testid={'ShoppingCartPage-emptyCart'} alignContent={'center'}>
                <Typography variant={'h6'} align={'center'}>Todavía no has seleccionado ningún look para comprar</Typography>
            </Grid>
        );
    };

    return (
        <div data-testid='ShoppingCartPage-title'>
            <Grid container spacing={3}>
                <Grid item lg={12}>
                    <Typography variant={'h4'} className={classes.shoppingCartPageTitle}>Revisa tus looks</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {
                    shoppingCartDresses.length > 0
                        ? renderShoppingCartDresses()
                        : renderEmptyCartMessage()
                }
            </Grid>
        </div>
    );
};

export default ShoppingCartPage;

const useStyles = makeStyles((theme) => ({
    shoppingCartPageTitle: {
        textTransform: 'uppercase',
        marginBottom: '3rem',
    },
}));