import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthenticationProvider } from "./AuthenticationProvider";

ReactDOM.render(
	<AuthenticationProvider value={localStorage.getItem("loginData")}>
		<App />
	</AuthenticationProvider>,
	document.getElementById("root")
);
