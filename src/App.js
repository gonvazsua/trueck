import './App.css';
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Login from "./components/Login/Login";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import HeaderUserData from "./components/HeaderUserData/HeaderUserData";

const App = () => {

    const headerUserData = <HeaderUserData />

    return (
        <div data-testid='app'>
            <BrowserRouter>
                <Header login={headerUserData} data-testId='Header-Component'/>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Switch>
                        <Route exact path="/login">
                            <Login/>
                        </Route>
                    </Switch>
                </Container>
            </BrowserRouter>
        </div>
    );
}

export default App;
