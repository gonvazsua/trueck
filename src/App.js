import './App.css';
import Header from "./components/Header/Header";
import {RecoilRoot} from "recoil";
import {BrowserRouter} from "react-router-dom";

function App() {
  return (
      <RecoilRoot>
          <div data-testid='app'>
              <BrowserRouter>
                  <Header data-testId='Header-Component'/>
              </BrowserRouter>
          </div>
      </RecoilRoot>
  );
}

export default App;
