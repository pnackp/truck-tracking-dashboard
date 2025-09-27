import "./Struck.css"
import { useState, useEffect } from "react";
import plus from "../../assets/plus.png"
import bin from "../../assets/bin.png"
import { api_json } from "../component/api/auth";

export function Truck({ onLogout, Onchangepage, setContainer, container }) {
    const handleAddbox = () => {
        setContainer(prev => {
            const updated = [
                ...prev,
                {
                    title: Math.random().toString(16).substr(2, 8),
                    times: new Date(),
                    server: "",
                    username: "",
                    password: "",
                }
            ];
            localStorage.setItem("Container", JSON.stringify(updated));
            return updated;
        });
    };

    const Deletebox = (index) => {
        setContainer(prev => {
            const updated = prev.filter((_, i) => i !== index);
            localStorage.setItem("Container", JSON.stringify(updated));
            return updated;
        });
    };

    return (
        <div className="container-2nd">
            <div className="topbar-2nd">
                <div className="topbar-2nd-left">
                    <a>Clients</a>
                </div>
                <div className="topbar-2nd-right">
                    <div className="Logout-box" onClick={() => { onLogout(null) }}>
                        <div ><a>Logout</a></div>
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
                        {container.map((value, index) => (
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
