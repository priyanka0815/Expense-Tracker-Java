import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header, NavBar } from "./Components/inc";
import Expense from "./Components/Expense";
import Category from "./Components/Categories";
import Login from "./Components/Account/login";
import { AuthenticationContext } from "./AuthenticationProvider";

const App = () => {
	const { authData } = useContext(AuthenticationContext);

	return (
		<BrowserRouter>
			{authData ? (
				<>
					<Header />
					<div id="main">
						<NavBar />
						<Routes>
							<Route path="/" element={<Expense />} />
							<Route path="/category" element={<Category />} />
						</Routes>
					</div>
				</>
			) : (
				<Routes>
					<Route path="/" element={<Login />} />
				</Routes>
			)}
		</BrowserRouter>
	);
};

export default App;
