import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
function Products() {
	const [products, setProducts] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			const res = await fetch('http://localhost:3001/api/products/');

			console.log(res);
			const json = await res.json();

			if (res.ok) {
				setProducts(json.payload);
			}
			console.log(json.payload);
		};
		fetchProducts();
	}, []);

	return (
		<div className="container mx-auto flex flex-wrap gap-10">
			{products && products.map((product) => <ProductCard key={product._id} product={product} />)}
		</div>
	);
}

export default Products;
