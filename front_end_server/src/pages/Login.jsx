import "./Login.css"
import { useState } from "react"

export function Login() {
    const [user, setUsername] = useState("");
    const [pass, setPassword] = useState("");
    const onbutClick = async () => {
        try {
            const response = await fetch("http://127.0.0.1:3000/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pass })
            });
            const data = await response.json();
            if(data.token){
                document.getElementsByClassName("main1")[0].style.display = "none";
                localStorage.setItem("token", data.token);
            }
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    };

    return (
        <div className="main1">
            <div className="Login-box">
                <div className="Login-part">
                    <div className="title">
                        <h1>Login</h1>
                    </div>
                    <div className="up">
                        <div className="username">
                            <input type="text" className="Username"
                            placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div className="password">
                            <input type="password" className="Password"
                            placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div className="Login-but">
                        <div className="bot">
                            <button onClick={onbutClick}><a className="text">Login</a></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="right-box"></div>
        </div>
    )
}