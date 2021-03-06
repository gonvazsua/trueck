import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Dress, ShoppingCartDress} from "../../api/dress/dressAPI";
import DressTags from "../DressTags/DressTags";
import {makeStyles} from "@material-ui/core";
import SizeSelector from "../SizeSelector/SizeSelector";
import DressAvailabilityCalendar from "../DressAvailabilityCalendar/DressAvailabilityCalendar";
import Button from "@material-ui/core/Button";
import {Favorite, ShoppingBasket} from "@material-ui/icons";
import {useRecoilState} from "recoil";
import {wishListAtom} from "../../common/wishList/wishListAtom";
import {shoppingCartAtom} from "../../common/shoppingCart/shoppingCartAtom";

export interface DressDetailsProps {
    dress: Dress;
};

const DressDetails = (props: DressDetailsProps): JSX.Element => {

    const {dress} = props;
    const classes = useStyles();
    const [wishList, setWishList] = useRecoilState(wishListAtom);
    const [shoppingCart, setShoppingCart] = useRecoilState(shoppingCartAtom);
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
    const [isDressAvailableByDate, setIsDressAvailableByDate] = useState<Boolean | undefined>(false);

    const handleOnClickAddToWishList = () => {
        const wishListDress = wishList.find(wishListDress => wishListDress.id === dress.id);
        if(!wishListDress) {
            setWishList([...wishList, dress]);
        }
    };

    const handleOnClickAddToShoppingCart = () => {
        const shoppingCartDress = shoppingCart.find(shoppingCartDress => shoppingCartDress.dress.id === dress.id);
        if(!shoppingCartDress && selectedDate) {
            const currentShoppingCartDress: ShoppingCartDress = {
                dress: dress,
                date: selectedDate
            };
            setShoppingCart([...shoppingCart, currentShoppingCartDress]);
        }
    };

    return (
        <Grid container spacing={3}>
            <Grid item lg={12}>
                <Typography variant={'h5'} className={classes.owner}>
                    Look de <span className={classes.username}>@{dress.username}</span>
                </Typography>
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'subtitle1'} className={classes.price}>
                    PRECIO ORIGINAL: <span className={classes.labeled}>{dress.originalPrice} EUR</span>
                </Typography>
                <Typography variant={'subtitle1'} className={classes.price}>
                    PRECIO ALQUILER: {dress.price} EUR
                </Typography>
            </Grid>
            <Grid item lg={12}>
                <Grid item lg={1}>
                    <Typography variant={'subtitle1'}>
                        TALLA
                    </Typography>
                </Grid>
                <Grid item lg={11}>
                    <SizeSelector selectedSize={dress.size}/>
                </Grid>
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'subtitle1'}>
                    {dress.description}
                </Typography>
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'subtitle1'}>
                    CATEGORIAS
                </Typography>
                <DressTags tags={dress.tags}/>
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Typography variant={'subtitle1'}>
                    COMPROBAR DISPONIBILIDAD
                </Typography>
                <DressAvailabilityCalendar dressId={dress.id} dateSelectedFn={setSelectedDate} isDressAvailableFn={setIsDressAvailableByDate} />
                <hr color={'grey'} className={classes.separator}/>
            </Grid>
            <Grid item lg={12}>
                <Button
                    variant={'contained'}
                    size={'large'}
                    disableElevation
                    startIcon={<ShoppingBasket/>}
                    fullWidth
                    data-testid={'DressDetails-addToShoppingCartButton'}
                    onClick={() => handleOnClickAddToShoppingCart()}
                    disabled={!isDressAvailableByDate}
                >
                    LO QUIERO
                </Button>
                <Button
                    variant={'outlined'}
                    size={'large'}
                    disableElevation
                    startIcon={<Favorite/>}
                    fullWidth
                    className={classes.actionButtons}
                    data-testid={'DressDetails-addToWishListButton'}
                    onClick={() => handleOnClickAddToWishList()}
                >
                    A??ADIR A LA LISTA DE DESEOS
                </Button>
            </Grid>
            <Grid item lg={12}>
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
    actionButtons: {
        marginTop: '0.5rem',
    },
    price: {
        color: '#000'
    },
    labeled: {
        textDecoration: 'line-through'
    },
}));

export default DressDetails;