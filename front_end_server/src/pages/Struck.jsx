import "./Struck.css"
import { useState, useEffect } from "react";
import { Crypy_func } from "./component/crypt/crypt_fn";
import { Check_token, Remove_token } from "./component/manage_token/mn_token";

export function Truck({ onLogout }) {
    const [boxes, setBoxes] = useState(() => {
        const saved = localStorage.getItem("boxes");
        return saved ? JSON.parse(saved) : [];
    });

    const [isCreate , Setcreate] = useState(false);

    useEffect(() => { localStorage.setItem("boxes", JSON.stringify(boxes)); }, [boxes]);
    
    const Addbox = () => {
        if (!Check_token("token_login")) { onLogout(null); }
        if (boxes.length < 5 * 3) {
            const x = Crypy_func();
            setBoxes([...boxes, { name: "name" + 1, status: "Disconnected", token: x }]);
        }
    };

    const Deletebox = (index) => {
        const newBoxes = boxes.filter((_, i) => i !== index);
        setBoxes(newBoxes);
        Remove_token(boxes[index]);
    };

    return (
        <div className="main-tr">
            <div className="main-top">
                <div className="main-top-left">
                    <a>Vehicle Lists</a>
                </div>
                <div className="main-top-right">
                    <div className="main-log-out">
                        <div className="log-out" onClick={() => { Remove_token("token_login"); onLogout(null); }}><a>LOGOUT</a></div>
                    </div>
                </div>
            </div>
            <div className="main-mid">
                <div className="main-mid-in">
                    <div className="mid-top">
                        <div className="mid-top-left">
                            <a>Name</a>
                        </div>
                        <div className="mid-top-mid">
                            <div className="mt-left">
                                <a>Status</a>
                            </div>
                            <div className="mt-right">
                                <a>Created</a>
                            </div>
                            <div className="mt-rr">
                                <a>Topic</a>
                            </div>
                        </div>
                        <div className="mid-top-right">
                            <div className="main-add">
                                <div className="add-but" onClick={() => {!isCreate ? Setcreate(true) : null;}}>
                                    <a>Add vehicle</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mid-in-m">
                        {boxes.map((id, index) => (
                            <div key={index} className="container">
                                <div className="container-in">
                                    <div className="ci-l">
                                        <a>{id.name}</a>
                                    </div>
                                    <div className="ci-mid">
                                        <div className="ci-left">
                                            <a>Disconnected</a>
                                        </div>
                                        <div className="ci-right">
                                            <a>12/07/122</a>
                                        </div>
                                        <div className="ci-rr">
                                            <a>Sensor/topic</a>
                                        </div>
                                    </div>
                                    <div className="ci-rightb">
                                        <div className="button-r">
                                            <div className="button-dele" onClick={() => Deletebox(index)}>
                                                <a>Delete</a>
                                            </div>

                                        </div>
                                        <div className="button-l">
                                            <div className="button-detail"><a>Detail</a></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="Addbox">
                <div className="info-box">
                    <div className="m-b">
                        <div className="m-b-t">
                            <div className="Server"><a>Server</a></div>
                            <div className="input-server"><input type="text" placeholder="Enter your broker ex : docker_server-mqtt-1"/></div>
                        </div>
                        <div className="m-b-p">
                            <div className="Port"><a>Port</a></div>
                            <div className="input-port"><input type="text" placeholder="Enter your port"/></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
