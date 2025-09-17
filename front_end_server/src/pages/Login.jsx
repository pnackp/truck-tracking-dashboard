import "./Login.css"
import { useState } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


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
            if (data.token) {
                document.getElementsByClassName("container-lg")[0].style.display = "none";
                localStorage.setItem("token", data.token);
            }
        } catch (err) {
            console.error("Fetch failed:", err);
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
                                    <input id="username" type="text" placeholder="Username" onChange={(e)=>{setUsername(e.target.value)}} />
                                </div>
                                <div className="Password">
                                    <input id="password" type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                                </div>
                            </div>
                            <div className="Bott">
                                <div className="bott-box">
                                    <button onClick={onbutClick}></button>
                                </div>
                            </div>
                        </div>
                        <div className="Contact">
                            <a>Made by Passakon Panseng 012</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-rp">
                <div className="animate">
                    <DotLottieReact
                        src="https://lottie.host/82d081f4-c03a-4637-b0ab-9b2f36707041/TyQaI9Kr6X.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>
        </div>
    )
}