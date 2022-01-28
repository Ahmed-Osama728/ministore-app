import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cart from './components/Cart';
import Header from './components/Header';
import ProductDetails from './components/ProductDetails';
import ProductList from './components/ProductList';

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [active, setActive] = useState('women');
  const [size, setSize] = useState(null);

  const currencyHandler = (currIndex) => {
    setCurrIndex(currIndex);
  };

  return (
    <Router>
      <Header
        setModalOpen={setModalOpen}
        modalOpen={modalOpen}
        currIndex={currIndex}
        currencyHandler={currencyHandler}
        active={active}
        setActive={setActive}
      />
      <ToastContainer />
      <Switch>
        <Route exact path="/">
          <ProductList
            currIndex={currIndex}
            modalOpen={modalOpen}
            active={active}
          />
        </Route>
        <Route path="/products/:id">
          <ProductDetails currIndex={currIndex} setSize={setSize} size={size} />
        </Route>
        <Route path="/Cart">
          <Cart currIndex={currIndex} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
