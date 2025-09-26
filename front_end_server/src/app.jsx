import { useState } from "react";
import { Login } from "./pages/Login/Login.jsx";
import { Truck } from "./pages/Truck/Struck.jsx";
import { Dashboard } from "./pages/Dashboard/Detail.jsx";
import { api_json } from "./pages/component/api/auth.jsx";

export default function App() {
    const [token, setToken] = useState(localStorage.getItem("login_token"));
    const [onInfo, setInfo] = useState(() => {
        const saved = localStorage.getItem("Pages");
        return saved ? saved : null;
    })
    const handleLoginSuccess = (newToken) => {
        localStorage.setItem("login_token", newToken);
        setToken(newToken);
    };

    const handleLogout = () => {
        localStorage.removeItem("login_token");
        setToken(null);
    };

    const Changepage = async (key) => {
        const token = localStorage.getItem("login_token");
        const Callback = await api_json("http://127.0.0.1:3000/updateContainer", "POST", JSON.stringify({ token }));
        if (Callback && Callback.status) {
            console.log("Changing Page");
            setInfo(key);
            localStorage.setItem("Pages", key);
        } else {
            console.log("Send back to login");
            onLogout(null);
        }
    }

    const Changeback = () => {
        localStorage.removeItem("Pages");
        setInfo(null)
        console.log("Going back");
    }

    return (
        <div>
            {!token ? (
                <Login onEvent={handleLoginSuccess} />
            ) : (
                !onInfo ? (<Truck onLogout={handleLogout} Onchangepage={Changepage} />) : (<Dashboard backEvent={Changeback} />)
            )}
        </div>
    );
}
