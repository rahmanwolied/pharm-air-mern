import LoginModal from './LoginModal';
import CartDropdown from './CartDropdown';
import { Link } from 'react-router-dom';
import UserIcon from './UserIcon';
import { useAuthContext } from '../hooks/useAuthContext';

function Navbar() {
	const { user } = useAuthContext();

	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link to="/">
					<div className="flex justify-center items-center mx-4">
						<img src="\assets\icons\medicine.png" alt="" className="w-10" />
						<h1 className="btn btn-ghost normal-case text-2xl text-[#F63D53] font-extrabold font-['Righteous']">PharmAir</h1>
					</div>
				</Link>
			</div>
			<div className="flex-none">
				<ul className="menu menu-horizontal px-1 items-center">
					<li>
						<Link to="/products">Products</Link>
					</li>
					<li>
						<Link to="/about">About</Link>
					</li>
					{!user && (
						<div className="flex justify-center items-center">
							<li>
								<Link to="/signup">Sign Up</Link>
							</li>
							<LoginModal />
						</div>
					)}
					{user && (
						<div className="flex justify-center items-center">
							<CartDropdown />
							<UserIcon />
						</div>
					)}
				</ul>
			</div>
		</div>
	);
}

export default Navbar;
