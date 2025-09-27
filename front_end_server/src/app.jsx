import { useState , useEffect } from "react";
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

    const [Container, SetContainer] = useState(() => {
            return [];
        });

    const handleLoginSuccess = (newToken) => {
        localStorage.setItem("login_token", newToken);
        setToken(newToken);
    };

    useEffect(() => {
        const updateContainer = async () => {
            try {
                const token = localStorage.getItem("login_token");
                if (!token) return;
                const Callback = await api_json(
                    "http://127.0.0.1:3000/updateContainer",
                    "POST",

                    JSON.stringify({
                        token,
                        container: JSON.stringify(Container),
                    })
                );
                if (!Callback || !Callback.status) {
                    console.log("Send back to login");
                    handleLogout();
                }
            } catch (err) {
                console.error(err);
            }
        };
        localStorage.setItem("Container", JSON.stringify(Container));
        updateContainer();
    }, [Container])

    const handleLogout = async () => {
        const token = localStorage.getItem("login_token");

        try {
            const Callback = await api_json("http://127.0.0.1:3000/Logout", "POST", JSON.stringify({ token }));
            if (Callback.status === true) {
                console.log("Logout success");
            } else {
                console.warn("Logout failed:", Callback.message);
            }
        } catch (err) {
            console.error("Logout error:", err);
        }
        finally {
            localStorage.removeItem("login_token");
            localStorage.removeItem("Container");
            setToken(null);
        }
    };

    const Changepage = async (key) => {
        const token = localStorage.getItem("login_token");
        const Callback = await api_json("http://127.0.0.1:3000/CheckLogin", "POST", JSON.stringify({ token }));
        if (Callback && Callback.status) {
            console.log("Changing Page");
            setInfo(key);
            localStorage.setItem("Pages", key);
        } else {
            console.log("Send back to login");
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
                <Login setContainer={SetContainer} onEvent={handleLoginSuccess} />
            ) : (
                !onInfo ? (<Truck onLogout={handleLogout}  Onchangepage={Changepage} container={Container} setContainer={SetContainer}/>) : (<Dashboard backEvent={Changeback} container={Container} setContainer={SetContainer} />)
            )}
        </div>
    );
}
