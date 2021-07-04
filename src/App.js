import './App.css';
import Header from "./Header/Header";
import {RecoilRoot} from "recoil";

function App() {
  return (
      <RecoilRoot>
        <div className="App" data-testid='App'>
          <Header data-testId='Header-Component'/>
        </div>
      </RecoilRoot>
  );
}

export default App;
