import './App.css';
import Header from "./components/Header/Header";
import {useRecoilValue} from "recoil";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {userAtom} from "./common/user/userAtom";
import Login from "./components/Login/Login";

const App = () => {

    const userState = useRecoilValue(userAtom);

    return (

        <div data-testid='app'>
            <BrowserRouter>
                <Header data-testId='Header-Component'
                        name={userState.user?.name}
                        isLoggedIn={userState.isLoggedIn}/>
                <Switch>
                    <Route exact path="/login">
                        <Login/>
                    </Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

export default App;
