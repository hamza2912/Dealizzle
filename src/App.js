import { useState } from 'react';
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import store from './js/store';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/HeaderPage/Header.js';
import { Routing } from './Routing';
import Card from './components/Card/Card'

function App() {
  const [card, setCard] = useState(false)
  const cardOpenHandler = () => {
    setCard(true);
  }
  const cardCloseHandler = () => {
    setCard(false);
    console.log('close')
  }
  return (
    <div className='overflowX'>
      <Provider store={store}>
        <BrowserRouter>
          {card ? <Card close={cardCloseHandler} toggle={card} /> : null}
          <Header open={cardOpenHandler} />
          <Routing open={cardOpenHandler} />
        </BrowserRouter>
      </Provider>,

      {/* <Main /> */}
    </div>
  );
}

export default App;
