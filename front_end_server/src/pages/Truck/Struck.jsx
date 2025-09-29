import "./Struck.css"
import plus from "../../assets/plus.png"
import bin from "../../assets/bin.png"
import { useEffect } from "react";
export function Truck({ onLogout, Onchangepage, setContainer, container }) {
    const handleAddbox = () => {
        setContainer(prev => [
            ...prev,
            {
                title: Math.random().toString(16).substr(2, 8),
                times: new Date(),
                server: "",
                username: "",
                password: "",
                qos: "0",
                topic: "",
            }
        ]);
    };

    const Deletebox = (index) => {
        setContainer(prev => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        const savedContainer = localStorage.getItem("Container");
        if (savedContainer) {
            try {
                setContainer(JSON.parse(savedContainer));
            } catch {
                setContainer([]);
            }
        }
    }, []);

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
                        {container && container.map((value, index) => (
                            <div
                                key={index}
                                id={value.title}
                                className="bx-con"
                                onClick={(e) => Onchangepage(e.target.id)}
                            >
                                <div className="title-bx"><a>{value.title}</a></div>
                                <div className="info-bx"><a>{new Date(value.times).toLocaleString()}</a></div>
                                <div className="delete">
                                    <div className="Delete-but">
                                        <img src={bin} onClick={() => Deletebox(index)} />
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
