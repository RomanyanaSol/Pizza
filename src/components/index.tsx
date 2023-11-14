import React, { Suspense, lazy } from 'react';
import '../scss/app.scss'
import Home from '../pages/Home.tsx';
import { Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout.tsx';

const Cart = lazy(() => import(/*webpackChunkName: 'Cart' */ '../pages/Cart.tsx'));
const NotFound = lazy(() => import(/*webpackChunkName: 'NotFound' */ '../pages/NotFound.tsx'));


function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route path='cart'
          element={
            <Suspense fallback={<div>Cart is loading...</div>}>
              < Cart />
            </Suspense>} />
        <Route path='*'
          element={
            <Suspense fallback={<div>Is loading...</div>}>
              < NotFound />
            </Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;
