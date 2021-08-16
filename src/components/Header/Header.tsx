import React from 'react';
import {AppBar, Badge, IconButton, makeStyles, Toolbar} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import {useHistory} from "react-router-dom";
import {Favorite, ShoppingBasket} from "@material-ui/icons";
import {useRecoilValue} from "recoil";
import {wishListAtom} from "../../common/wishList/wishListAtom";
import {shoppingCartAtom} from "../../common/shoppingCart/shoppingCartAtom";

interface HeaderProps {
    loginComponent: React.ReactNode;
}

const Header = (props: HeaderProps): JSX.Element => {

    const classes = useStyles();
    const history = useHistory();
    const {loginComponent} = props;
    const wishList = useRecoilValue(wishListAtom);
    const shoppingCart = useRecoilValue(shoppingCartAtom);

    const handleClickNavigation = (path: string) => {
        history.push(path);
    };

    return (
        <AppBar position="static" color='default' className={classes.appBar}>
            <Toolbar>
                <Typography align='left' variant="h5" className={classes.title} data-testid='header-title'
                            onClick={() => handleClickNavigation('')}>
                    Save the dress
                </Typography>
                <div className={classes.grow}/>
                <div className={classes.actionBar}>
                    <div className={classes.sectionDesktop}>
                        <IconButton color='inherit'>
                            <Badge badgeContent={wishList.length} color="secondary" data-testid='header-wishes'>
                                <Favorite/>
                            </Badge>
                        </IconButton>
                    </div>
                    <div className={classes.sectionDesktop}>
                        <IconButton color='inherit'>
                            <Badge badgeContent={shoppingCart.length} color="secondary" data-testid='header-shoppingCart'>
                                <ShoppingBasket/>
                            </Badge>
                        </IconButton>
                    </div>
                </div>
                {loginComponent}
            </Toolbar>
        </AppBar>
    );
}

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        cursor: 'pointer',
        textTransform: 'uppercase',
    },
    menuLink: {
        flexGrow: 1,
        cursor: 'pointer',
    },
    grow: {
        flexGrow: 1,
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
        textTransform: 'uppercase',
    },
    appBar: {
        backgroundColor: '#FFF',
        boxShadow: 'none',
    },
    actionBar: {
        display: 'flex',
        marginRight: '3rem',
    }
}));

export default Header;