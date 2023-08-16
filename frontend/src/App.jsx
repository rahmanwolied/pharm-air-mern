import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import Signup from './pages/Signup';
import ShoppingCart from './pages/ShoppingCart';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/cart" element={<ShoppingCart />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
