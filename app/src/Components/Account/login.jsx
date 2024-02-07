import React, { useContext, useState } from "react";
import "./account.css";
import { AuthenticationContext } from "../../AuthenticationProvider";
const Login = () => {
	const [formResponse, setFormResponse] = useState({});
	const { authData, setAuthData } = useContext(AuthenticationContext);

	function inputChange(e) {
		e.persist();

		setFormResponse((prevFormResponse) => ({
			...prevFormResponse,
			[e.target.name]: e.target.value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();

		try {
			const res = await fetch("http://localhost:8080/api/account/login", {
				method: "post",
				body: JSON.stringify(formResponse),
				headers: {
					"content-type": "application/json",
				},
			});
			if (!res.ok) {
				throw new Error("Invalid Credentials");
			}

			// login successful
			const data = await res.json();
			localStorage.setItem("loginData", JSON.stringify(data));
			setAuthData(data);
		} catch (e) {
			alert(e.message);
		}
	}
	return (
		<div id="login">
			<div className="form">
				<form onSubmit={handleSubmit}>
					<div className="form-field">
						<label>Email</label>

						<input type="text" name="email" value={formResponse?.email} onChange={inputChange} />
					</div>

					<div className="form-field">
						<label>Password</label>

						<input type="password" name="password" value={formResponse?.password} onChange={inputChange} />
					</div>

					<div className="form-field">
						<button type="submit">Login</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
