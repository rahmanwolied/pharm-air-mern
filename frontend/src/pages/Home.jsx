const Banner = () => {
	return (
		<div className="header">
			<div className="banner">
				<div className="hero-text">
					<h1>Get your medicine from PharmAir</h1>
					<p>Experience the convenience of PharmAir - your trusted partner for timely prescription deliveries.</p>
				</div>
				<a className="get-started" href="/register">
					Get Started
				</a>
			</div>
		</div>
	);
};

function Search() {
	return (
		<section className="search">
			<div className="overlay"></div>
			<div className="content">
				<h1>Find any pill you want.</h1>
				<form action="">
					<input type="text" placeholder="Search for a pill" />
					<button type="submit">Search</button>
				</form>
			</div>
		</section>
	);
}

function Home() {
	return (
		<>
			<Banner />
			<Search />
		</>
	);
}

export default Home;
