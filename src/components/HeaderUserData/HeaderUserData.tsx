import React from 'react';
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {makeStyles} from "@material-ui/core";
import {signOut} from "../../pages/Login/loginAPI";

interface HeaderUserDataProps {
    isLoggedInManually?: boolean;
}

const HeaderUserData = (props: HeaderUserDataProps): JSX.Element => {

    const classes = useStyles();
    const history = useHistory();
    const {isLoggedInManually} = props;

    const handleLoginClick = () => {
        history.push('login');
    };

    const handleLogoutClick = () => {
        signOut().then(r => {
            history.push('login');
        });
    };

    return (
        <Button color="inherit" data-testid='header-loginButton' name="loginButton"
                onClick={handleLoginClick}>Login</Button>
    );

};

const useStyles = makeStyles(() => ({
    title: {
        flexGrow: 1,
        marginRight: '2rem',
    },
    userInformation: {
        display: 'flex',
    },
}));

export default HeaderUserData;