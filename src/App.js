import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import { CartProvider } from './components/ContextReducer';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import MyOrder from './pages/MyOrders';

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='myorders' element={<MyOrder />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />

          </Routes>
        </Router>
      </CartProvider>

    </>

  );
}

export default App;
