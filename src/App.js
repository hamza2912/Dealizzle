import './App.css';
import { BrowserRouter } from 'react-router-dom';
import store from './js/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderPage/Header.js';
import { Routing } from './Routing';

function App() {
  return (
    <div >
   <Provider store={store}>
   <BrowserRouter>
   <Header />
   <Routing />
   </BrowserRouter>
 </Provider>,
   
    {/* <Main /> */}
    </div>
  );
}

export default App;
