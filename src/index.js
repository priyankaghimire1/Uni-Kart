import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
import Home from '../src/components/Home';
import Signup from '../src/components/Signup';
import Login from '../src/components/Login';
import Profile from '../src/components/Profile';
import AddProduct from '../src/components/AddProduct';
import Catalogue from '../src/components/Catalogue';
import Wishlistpage from '../src/components/Wishlistpage';
import Myproductspage from './components/Myproductspage';
import EditProduct from './components/EditProduct';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import MyOrderspage from './components/MyOrderspage';
import ForgotPassword from './components/ForgotPassword';
import{
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
const router= createBrowserRouter([
  {
    path: "/",
    element: <Home/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/add-product",
    element:<AddProduct/>
  },
  {
    path:"/catalogue",
    element: <Catalogue/>
  },
  {
    path:"/catalogue/:category",
    element: <Catalogue/>
  },
  {
    path:"/wishlist",
    element: <Wishlistpage/>
  },
  {
    path:"/my-products",
    element: <Myproductspage/>
  },
  {
    path:"/product-edit/:productid",
    element: <EditProduct/>
  },
  {
    path:"/product/:productId",
    element: <ProductDetails/>
  },
  {
    path:"/cart",
    element: <Cart/>
  },
  {
    path:"/my-products/:pid",
    element:<Myproductspage/>
  },
  {
    path:"/my-orders",
    element: <MyOrderspage/>
  },
  {
  path:"/Forgot-password",
    element:<ForgotPassword/>
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
