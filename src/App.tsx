import React from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { OrdersProvider } from './OrdersContext';

const App: React.FC = () => {

  return (
    <OrdersProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
    </OrdersProvider>
  )
};

export default App;