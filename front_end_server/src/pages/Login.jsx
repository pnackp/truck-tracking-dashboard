import "./Login.css"
import { useState } from "react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'; // import animation
import { Insert_token } from "./component/manage_token/mn_token";

export function Login({ onLogin }) { // app sent "function" to parmeter login
    const [user, setUsername] = useState(""); // create user state // you can set user by call fuction setUsername
    const [pass, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const onbutClick = async () => {
        if (user == "" || pass == "") return;
        setLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:3000/Login", { // fire to this ip and wait for respond
                method: "POST", // SET post is mean you send somethings and you need somethings back
                headers: { "Content-Type": "application/json" }, //Tell receiver this file is json
                body: JSON.stringify({ username: user, password: pass }) //insert value in object
            });
            const data = await response.json(); // take what receiver send back
            if (data.token) { // if have token 
                Insert_token("token", data.token); // Set token in local for next no need to login
                onLogin(data.token);    // call function Onlogin for change page to dashboard
            }
        } catch (err) {
            console.error("Fetch failed:", err); // if cant connect to ip
        }
        finally {
            setLoading(false);
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
                                    <input id="username" type="text" placeholder="Username" onChange={(e) => { setUsername(e.target.value) }} />
                                </div>
                                <div className="Password">
                                    <input id="password" type="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }} />
                                </div>
                            </div>
                            <div className="Bott">
                                <div className="bott-box">
                                    <button onClick={onbutClick} disabled={loading}></button>
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
                        src="https://lottie.host/be258ad2-a8da-4d03-bd80-cc136809de13/bnk9J3zn4H.lottie"
                        loop
                        autoplay
                    />
                </div>
            </div>
        </div>
    )
}