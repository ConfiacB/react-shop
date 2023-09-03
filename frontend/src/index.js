import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import store from './store';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AdminRoute, PrivateRoute } from './components/route';
import * as Screens from './screens';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Screens.HomeScreen />} />
      <Route path="/search/:keyword" element={<Screens.HomeScreen />} />
      <Route path="/page/:pageNumber" element={<Screens.HomeScreen />} />
      <Route path="/search/:keyword/page/:pageNumber" element={<Screens.HomeScreen />} />
      <Route path="/product/:id" element={<Screens.ProductScreen />} />
      <Route path="/cart" element={<Screens.CartScreen />} />
      <Route path="/login" element={<Screens.LoginScreen />} />
      <Route path="/register" element={<Screens.RegisterScreen />} />
      
      {/* Logged in users*/}
      <Route path='' element={<PrivateRoute />}>
        <Route path="/shipping" element={<Screens.ShippingScreen />} />
        <Route path="/payment" element={<Screens.PaymentScreen />} />
        <Route path='/placeorder' element={<Screens.PlaceOrderScreen />} />
        <Route path='/order/:id' element={<Screens.OrderScreen />} />
        <Route path='/profile' element={<Screens.ProfileScreen />} />
      </Route>
      {/* Admin users */}
      <Route path='' element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<Screens.OrderListScreen />} />
        <Route path="/admin/productlist" element={<Screens.ProductListScreen />} />
        <Route path="/admin/productlist/:pageNumber" element={<Screens.ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<Screens.ProductEditScreen />} />
        <Route path="/admin/userlist" element={<Screens.UserListScreen />} />
        <Route path="/admin/user/:id/edit" element={<Screens.UserEditScreen />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();
