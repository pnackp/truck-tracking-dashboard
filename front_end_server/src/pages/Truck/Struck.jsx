import "./Struck.css"
import { useState, useEffect } from "react";
import plus from "../../assets/plus.png"
import bin from "../../assets/bin.png"
import { api_json } from "../component/api/auth";

export function Truck({ onLogout }) {
    const [Container, SetContainer] = useState(() => {
        return localStorage.getItem("Container") ? JSON.parse(localStorage.getItem("Container")) : [];
    });

    const handleAddbox = async () => {
        const token = localStorage.getItem("login_token");
        const Callback = await api_json("http://127.0.0.1:3000/CheckLogin","POST", JSON.stringify({ token }));
        console.log(Callback);
        if (Callback && Callback.status) {
            SetContainer((prev) => [
                ...prev,
                {
                    title: Math.random().toString(16).substr(2, 8),
                    times: new Date(),
                }
            ]);
        } else {
            console.log("Send back to login");
            onLogout(null);
        }
    };


    useEffect(() => {
        localStorage.setItem("Container", JSON.stringify(Container));
    }, [Container]);

    const Deletebox = (index) => {
        const newContainer = Container.filter((_, i) => i !== index);
        SetContainer(newContainer);
        localStorage.setItem("Container", JSON.stringify(newContainer));
    };

    return (
        <div className="container-2nd">
            <div className="topbar-2nd">
                <div className="topbar-2nd-left">
                    <a>Clients</a>
                </div>
                <div className="topbar-2nd-right">
                    <div className="Logout-box">
                        <div onClick={() => { onLogout(null) }}><a>Logout</a></div>
                    </div>
                </div>
            </div>
            <div className="mid-2nd">
                <div className="container-mid">
                    <div className="Top-bar">
                        <div className="Top-left-mid">
                            <a>Dashboards</a>
                        </div>
                        <div className="info">
                            <a>Created</a>
                        </div>
                        <div className="Top-right">
                            <div className="Add-but">
                                <img src={plus} alt="Add" onClick={() => { handleAddbox() }} />
                            </div>
                        </div>
                    </div>
                    <div className="mid-box">
                        {Container.map((value, index) => (
                            <div key={index} id={value.title} className="bx-con">
                                <div className="title-bx"><a>{value.title}</a></div>
                                <div className="info-bx"><a>{new Date(value.times).toLocaleString()}</a></div>
                                <div className="delete">
                                    <div className="Delete-but">
                                        <img src={bin} onClick={() => { Deletebox(index) }}></img>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
