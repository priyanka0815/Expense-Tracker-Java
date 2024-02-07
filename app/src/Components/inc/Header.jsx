import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthenticationContext } from "../../AuthenticationProvider";

const Header = () => {
	const { authData, setAuthData } = useContext(AuthenticationContext);
	const navigate = useNavigate();
	function logout() {
		setAuthData(null);
		localStorage.setItem("loginData", null);
		navigate("/");
	}

	return (
		<header>
			<div>
				<Link to="/">
					<div className="logo">ExpenserTrac</div>
				</Link>
			</div>

			<div className="user">
				<div>
					<img src="https://cdn-icons-png.flaticon.com/512/1144/1144760.png" alt="user-image" />
				</div>
				<div className="name">{authData.name}</div>

				<ul>
					<li onClick={logout}>Logout</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
