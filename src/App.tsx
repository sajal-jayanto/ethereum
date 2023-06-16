import "./App.css";
import Header from "./components/Header";
import MainBody from "./components/MainBody";

const App = () => {
  return (
    <div className="App">
      <div className="is-boxed has-animations">
        <div className="body-wrap">
          <Header />
          <MainBody />
        </div>
      </div>
    </div>
  );
};

export default App;
