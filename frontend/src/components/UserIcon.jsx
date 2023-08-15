import { useAuthContext } from '../hooks/useAuthContext';
import BufferToImage from '../helpers/bufferToImage.helper';
import { useLogout } from '../hooks/useLogout';

function UserIcon() {
	const { user } = useAuthContext();
	const { logout } = useLogout();

	const handleClick = () => {
		logout();
	};

	const buffer = user.user.image.data.data;
	const base64String = BufferToImage(buffer);

	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn btn-ghost btn-circle avatar">
				<div className="w-10 rounded-full">
					<img src={base64String} />
				</div>
			</label>
			<ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
				<li>
					<a className="justify-between">
						Profile
						<span className="badge">New</span>
					</a>
				</li>
				<li>
					<a>Settings</a>
				</li>
				<li>
					<a onClick={handleClick}>Logout</a>
				</li>
			</ul>
		</div>
	);
}

export default UserIcon;
