import './App.css';
import Header from "./Header/Header";

function App() {
  return (
    <div className="App" data-testid='App'>
      <Header data-testId='Header-Component'/>
    </div>
  );
}

export default App;
