import LoginModal from './LoginModal';
import CartDropdown from './CartDropdown';
import { Link } from 'react-router-dom';
import UserIcon from './UserIcon';

function Navbar() {
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<Link to="/">
					<h1 className="btn btn-ghost normal-case text-2xl text-blue-500">PharmAir</h1>
				</Link>
			</div>
			<div className="flex-none">
				<CartDropdown />
				<LoginModal />
				<UserIcon />
			</div>
		</div>
	);
}

export default Navbar;
