import "./Struck.css"
import { useState, useEffect } from "react";
import plus from "../../assets/plus.png"
import bin from "../../assets/bin.png"
import { api_json } from "../component/api/auth";

export function Truck({ onLogout, Onchangepage }) {
    const [Container, SetContainer] = useState(() => {
        const stored = localStorage.getItem("Container");
        if (stored) {
            try {
                const parsed = JSON.parse(stored);
                return Array.isArray(parsed) ? parsed : [];
            } catch (e) {
                return [];
            }
        }
        return [];
    });
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
                    onLogout(null);
                }
            } catch (err) {
                console.error(err);
            }
        };
        localStorage.setItem("Container", JSON.stringify(Container));
        updateContainer();
    }, [Container])

    const handleAddbox = async () => {
        SetContainer((prev) => [
            ...prev,
            {
                title: Math.random().toString(16).substr(2, 8),
                times: new Date(),
            }
        ]);
    };
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
                            <div key={index} id={value.title} className="bx-con" onClick={(e) => { Onchangepage(e.target.id) }}>
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
