import { useState } from "react";
import { Login } from "./pages/Login/Login.jsx";
import { Truck } from "./pages/Truck/Struck.jsx";

export default function App() {
    const [token, setToken] = useState(localStorage.getItem("login_token"));

    const handleLoginSuccess = (newToken) => {
        localStorage.setItem("login_token", newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem("login_token");
        setToken(null);
    };

    return (
        <div>
            {!token ? (
                <Login onEvent={handleLoginSuccess} />
            ) : (
                <Truck onLogout={handleLogout} />
            )}
        </div>
    );
}
