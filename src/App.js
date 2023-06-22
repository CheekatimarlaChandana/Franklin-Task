import logo from "./logo.svg";
import "./App.css";
// import Analytics from "./Components/Analytics";
import Boxigo from "./Components/Boxigos";
import "bootstrap/dist/css/bootstrap.css";
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Analytics /> */}
        <Boxigo />
      </header>
    </div>
  );
}

export default App;
