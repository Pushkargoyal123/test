import AddData from "./AddData";
import {Route, BrowserRouter} from 'react-router-dom'
import DisplayProduct from "./DisplayProduct";

function App(props) {
  return (
    <div className="App">
      <BrowserRouter>
        <Route component={AddData} path="/add" props={props.history}></Route>
        <Route component={DisplayProduct} path="/display"></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
