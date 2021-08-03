import React from 'react';
import './App.css';
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./pages/Login/Login";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import HeaderUserData from "./components/HeaderUserData/HeaderUserData";
import LandingPage from "./pages/LandingPage/LandingPage";
import {MuiPickersUtilsProvider} from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {createTheme, makeStyles, MuiThemeProvider} from "@material-ui/core";
import Footer from "./components/Footer/Footer";
import moment from "moment";
import SignUp from "./pages/SignUp/SignUp";
import DressDetailsPage from "./pages/DressDetailsPage/DressDetailsPage";

const App = (): JSX.Element => {

    const headerUserData = <HeaderUserData/>
    const classes = useStyles();

    return (
        <div data-testid='app'>
            <MuiThemeProvider theme={trueckTheme}>
                <MuiPickersUtilsProvider utils={MomentUtils} libInstance={moment}>
                    <BrowserRouter>
                        <Header loginComponent={headerUserData} data-testId='Header-Component'/>
                        <Container component="main">
                            <CssBaseline/>
                            <Switch>
                                <Route exact path="/login">
                                    <Login/>
                                </Route>
                                <Route exact path="/signup">
                                    <SignUp/>
                                </Route>
                                <Route exact path="/dress-details/:dressId">
                                    <div className={classes.pageContainer}>
                                        <DressDetailsPage/>
                                    </div>
                                </Route>
                                <Route exact path="/">
                                    <div className={classes.pageContainer}>
                                        <LandingPage/>
                                    </div>
                                </Route>
                            </Switch>
                        </Container>
                        <Footer/>
                    </BrowserRouter>
                </MuiPickersUtilsProvider>
            </MuiThemeProvider>
        </div>
    );
}

export default App;

const useStyles = makeStyles((theme) => ({
    pageContainer: {
        marginTop: '5rem',
    }
}));

const trueckTheme = createTheme({
    palette: {
        secondary: {
            main: '#FF8A80',
            contrastText: '#FFFFFF',
        },
    },
});
