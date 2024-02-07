import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
	const navLinks = [
		{
			title: "Expenses",
			link: "/",
		},
		{
			title: "Catgories",
			link: "/category",
		},
	];
	return (
		<div id="navbar">
			<div className="menu">Menu</div>
			<nav>
				{navLinks.map((link, idx) => (
					<Link to={link.link} key={idx}>
						<li>{link.title}</li>
					</Link>
				))}
			</nav>
		</div>
	);
};

export default NavBar;
