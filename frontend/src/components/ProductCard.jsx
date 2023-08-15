// eslint-disable-next-line react/prop-types
const ProductCard = ({ product }) => {
	return (
		<div className="card w-96 bg-base-100 border-solid border border-[rgba(18, 18, 18, 0.10)]">
			{/* <figure className="px-10 pt-10">
				<img src="images/fruit6.png" alt="Shoes" className="rounded-xl" />
			</figure> */}
			<div className="card-body items-center text-center">
				<h2 className="card-title">
					{
						// eslint-disable-next-line react/prop-types
						product.name
					}
				</h2>
				<div className="divider"></div>
				<p>
					$
					{
						// eslint-disable-next-line react/prop-types
						product.price
					}
				</p>

				<div className="card-actions">
					<button className="btn btn-link text-[#f85559] no-underline" onClick="modal1.showModal()">
						Details
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductCard;
