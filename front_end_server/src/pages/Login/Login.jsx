import "./Login.css"
import { useState } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { api_json } from "../component/api/auth";

export function Login({ onEvent, setContainer }) {
    const [username, SetUsername] = useState("");
    const [password, SetPassword] = useState("");

    const handleLogin = async () => {
        if (!username || !password) return alert("Username or password is blank");
        try {
            const { token, container_box } = await api_json("http://127.0.0.1:3000/Login", "POST", JSON.stringify({ username, password })) || {};
            if (token) {
                onEvent(token);
                if (container_box) {
                    setContainer(container_box);
                }else{
                    setContainer([]);
                }
            } else console.log("Login failed");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="container-lg">
            <div className="container-lp">
                <div className="lg-p">
                    <div className="lg-p-box">
                        <div className="title_lg"><h1>Welcome to <br></br> Our Dashboard</h1></div>
                        <div className="lg_box">
                            <div className="lg_title"><a>Login Account</a></div>
                            <div className="up">
                                <div className="Username">
                                    <input value={username} onChange={e => SetUsername(e.target.value)} placeholder="Enter your Username" />
                                </div>
                                <div className="Password">
                                    <input type="password" value={password} placeholder="Password" onChange={(e) => { SetPassword(e.target.value) }} />
                                </div>
                            </div>
                            <div className="Bott">
                                <div className="bott-box">
                                    <div className="bott-click" onClick={() => { handleLogin(); }}><a>Login</a></div>
                                </div>
                            </div>
                        </div>
                        <div className="Contact">
                            <a>@pnackp</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-rp">
                <div className="animate">
                    <DotLottieReact
                        src="https://lottie.host/be258ad2-a8da-4d03-bd80-cc136809de13/bnk9J3zn4H.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>
        </div>
    )
}