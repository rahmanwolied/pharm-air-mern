import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
function Products() {
	const [products, setProducts] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch('http://localhost:3001/api/products/');
			const json = await res.json();

			if (res.ok) {
				setProducts(json.payload);
				setLoading(false);
			}
		};
		fetchProducts();
	}, []);

	if (loading)
		return (
			<div className="container mx-auto">
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);
	return (
		<div className="max-w-7xl mx-auto py-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
			{products && products.map((product) => <ProductCard key={product._id} product={product} />)}
		</div>
	);
}

export default Products;
