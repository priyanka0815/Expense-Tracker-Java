import React, { Children, createContext, useState } from "react";

export const AuthenticationContext = createContext();
const AuthenticationProvider = ({ value, children }) => {
	const [authData, setAuthData] = useState(value ? JSON.parse(value) : null);

	return (
		<AuthenticationContext.Provider value={{ authData, setAuthData }}>{children}</AuthenticationContext.Provider>
	);
};

export { AuthenticationProvider };
