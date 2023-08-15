import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
	return (
		<div className="app">
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/products" element={<Products />} />
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
