import "./Struck.css"
import { useState, useEffect } from "react";
import { Check_token, Remove_token } from "./component/manage_token/mn_token";
import { useMqtt } from "./component/mqtt/mqttcon";

export function Truck({ onLogout }) {
    const initialForm = { server: "", port: "", user: "", pass: "", topic: "", pro: "ws://" };
    const [formData, setFormData] = useState(initialForm);

    const [boxes, setBoxes] = useState(() => {
        const saved = localStorage.getItem("boxes");
        return saved ? JSON.parse(saved) : [];
    });
    
    const [isCreate, Setcreate] = useState(false);
    const { statuses, messages } = useMqtt(boxes);
    useEffect(() => { localStorage.setItem("boxes", JSON.stringify(boxes)); }, [boxes]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const Addbox = () => {
        if (!Check_token("token_login")) { onLogout(null); }
        if (!formData.server || !formData.port || !formData.topic) {
            alert("Server, Port, and Topic are required!");
            Setcreate(false);
            return;
        }
        if (boxes >= 15) return;
        setBoxes([
            ...boxes,
            {
                name: "Payload " + (boxes.length + 1),
                status: "Disconnected",
                ...formData,
                date: new Date(),
                clientId: "truck_" + Math.random().toString(16).substr(2, 8)
            }
        ]);
        console.log(formData.pro);
        Setcreate(false);
        setFormData(initialForm);
    };

    const Deletebox = (index) => {
        const newBoxes = boxes.filter((_, i) => i !== index);
        setBoxes(newBoxes);
        Remove_token(boxes[index]);
    };

    return (
        <div className="main-tr">
            <div className="main-top">
                <div className="main-top-left"><a>Vehicle Lists</a></div>
                <div className="main-top-right">
                    <div className="main-log-out">
                        <div className="log-out" onClick={() => { Remove_token("token_login"); onLogout(null); }}>
                            <a>LOGOUT</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-mid">
                <div className="main-mid-in">
                    <div className="mid-top">
                        <div className="mid-top-left"><a>Name</a></div>
                        <div className="mid-top-mid">
                            <div className="mt-left"><a>Status</a></div>
                            <div className="mt-right"><a>Created</a></div>
                            <div className="mt-rr"><a>Topic</a></div>
                        </div>
                        <div className="mid-top-right">
                            <div className="main-add">
                                <div className="add-but" onClick={() => { !isCreate ? Setcreate(true) : null; }}>
                                    <a>Add vehicle</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mid-in-m">
                        {boxes.map((id, index) => (
                            <div key={index} className="container">
                                <div className="container-in">
                                    <div className="ci-l"><a>{id.name}</a></div>
                                    <div className="ci-mid">
                                        <div className="ci-left"><div className="st-box" style={{
                                            backgroundColor: statuses[id.clientId] === "Connected"? 
       "rgb(8, 197, 8)" :  "rgba(231, 16, 16, 1)"
                                        }}><a>{statuses[id.clientId]}</a></div></div>
                                        <div className="ci-right"><a>{new Date(id.date).toLocaleString()}</a></div>
                                        <div className="ci-rr"><a>{id.topic}</a></div>
                                    </div>
                                    <div className="ci-rightb">
                                        <div className="button-r">
                                            <div className="button-dele" onClick={() => {Deletebox(index)} }><a>Delete</a></div>
                                        </div>
                                        <div className="button-l"><div className="button-detail"><a>Detail</a></div></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="Addbox" style={{ display: isCreate ? "flex" : "none" }}>
                <div className="info-box">
                    <div className="m-b">
                        <div className="m-b-t">
                            <div className="Server"><a>Server</a></div>
                            <div className="input-server">
                                <input type="text" name="server" placeholder="Enter your broker" value={formData.server} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="m-b-p">
                            <div className="Port"><a>Port</a></div>
                            <div className="input-port">
                                <input type="text" name="port" placeholder="Enter your port" value={formData.port} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="m-b-user">
                            <div className="user"><a>User</a></div>
                            <div className="input-user">
                                <input type="text" name="user" placeholder="Enter your username" value={formData.user} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="m-b-pass">
                            <div className="pass"><a>Pass</a></div>
                            <div className="input-pass">
                                <input type="password" name="pass" placeholder="Enter your password" value={formData.pass} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="m-b-topic">
                            <div className="topic"><a>Topic</a></div>
                            <div className="input-topic">
                                <input type="text" name="topic" placeholder="Enter your topic" value={formData.topic} onChange={handleChange} />
                            </div>
                        </div>
                        <div className="m-b-client">
                            <div className="client"><a>protocal</a></div>
                            <div className="input-pro">
                                <select name="pro" value={formData.pro} onChange={handleChange}>
                                    <option value="ws://">ws://</option>
                                    <option value="wss://">wss://</option>
                                </select>
                            </div>
                        </div>
                        <div className="c-f">
                            <div className="create">
                                <div className="cre-b" onClick={Addbox}><a>Create</a></div>
                            </div>
                            <div className="cancel">
                                <div className="canc-b" onClick={() => { Setcreate(false) }}><a>Cancel</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
