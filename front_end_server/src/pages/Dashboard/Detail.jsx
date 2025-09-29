import "./Detail.css"
import { useEffect, useState } from "react"
import { useMqttConnect } from "../component/mqtt/mqtt";
import 'leaflet/dist/leaflet.css';
import { MyMap } from "../component/map/map";


export function Dashboard({ title, backEvent, container, setContainer }) {
    const [onclickConnect, setClickConnect] = useState(false);

    const [serverInput, SetServerInput] = useState("");
    const [userInput, SetUserInput] = useState("");
    const [passInput, SetPasswordInput] = useState("");
    const [topicInput, SetTopicInput] = useState("");
    const [qosInput, SetQosInput] = useState(0);

    const [onClickSub, SetSub] = useState(false);

    const [payload, setPayload] = useState([]);

    const { mqttConnect, connectStatus, mqttDisconnect, mqttSub, mqttUnSub } = useMqttConnect({ setPayload });

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

    useEffect(() => {
        const currentItem = container?.find(item => item.title === title);
        if (currentItem) {
            SetServerInput(currentItem.server || "");
            SetUserInput(currentItem.username || "");
            SetPasswordInput(currentItem.password || "");
            SetTopicInput(currentItem.topic || "");
            SetQosInput(currentItem.qos || 0);
        }
    }, [container, title]);

    useEffect(() => {
        if (!topicInput || connectStatus !== "Connected") return;
        console.log(qosInput);
        if (onClickSub) {
            setContainer(prev =>
                prev.map(item => {
                    if (item.title === title) {
                        return {
                            ...item,
                            topic: topicInput,
                            qos: qosInput,
                        };
                    }
                    return item;
                })
            )
            console.log(topicInput, qosInput);
            mqttSub(topicInput, qosInput);
        } else {
            mqttUnSub(topicInput);
        }
    }, [onClickSub])


    useEffect(() => {
        if (onclickConnect) {
            setContainer(prev =>
                prev.map(item => {
                    if (item.title === title) {
                        return {
                            ...item,
                            server: serverInput,
                            username: userInput,
                            password: passInput,
                        };
                    }
                    return item;
                })
            )
            mqttConnect(serverInput, {
                username: userInput,
                password: passInput,
                clientId: "client_" + Math.random().toString(16).substr(2, 8),
            });
        } else {
            mqttDisconnect();
        }
    }, [onclickConnect])


    const [lonInput, setLoninput] = useState(0);
    const [latInput, setLatinput] = useState(0);

    useEffect(() => {
        if (payload.length > 0 && payload[0].message) {
            try {
                const msg = JSON.parse(payload[0].message);
                setLatinput(msg.lat);
                setLoninput(msg.lon);
            } catch (e) {
                console.error("Invalid JSON in payload:", payload[0].message);
            }
        }
    }, [payload]);

    return (
        <div className="container-Dashboard">
            <div className="topbar-Dashboard">
                <div className="topbar-left-name">
                    <a>{title}</a>
                </div>
                <div className="topbar-right-button">
                    <div className="goBackbutton" onClick={() => {
                        if (!onclickConnect && !onClickSub) {
                            backEvent();
                        }
                    }}>
                        <a>Back</a>
                    </div>
                </div>
            </div>
            <div className="midbar-Dashboard">
                <div className="div1">
                    <div className="Connect">
                        <div className="connect-box">
                            <div className="top-con">
                                <a>Connect to Mqtt broker</a>
                            </div>
                            <div className="info-con">
                                <div className="Server">
                                    <label htmlFor="Server-in">Server input</label>
                                    <input key="server" value={serverInput} className="Server-in" placeholder="Sever ip and Port" onChange={(e) => { SetServerInput(e.target.value) }} />
                                </div>
                                <div className="Up">
                                    <div className="username">
                                        <label htmlFor="username-in">Username</label>
                                        <input value={userInput} key="username" className="username-in" type="text" placeholder="Enter Username to connect" onChange={(e) => { SetUserInput(e.target.value) }} />
                                    </div>
                                    <div className="password">
                                        <label htmlFor="password-in">Password</label>
                                        <input value={passInput} className="password-in" type="password" placeholder="Enter Password to connect" onChange={(e) => { SetPasswordInput(e.target.value) }} />
                                    </div>
                                </div>
                                <div className="buttonAnPro">
                                    <div className="ConnectButton">
                                        <div className={onclickConnect ? "button-connected" : "button-CorD"} onClick={() => {
                                            if (serverInput) {
                                                setClickConnect(!onclickConnect);
                                            } else {
                                                setClickConnect(false);
                                            }
                                        }}>
                                            <a>{onclickConnect ? "Disconnect" : "Connect"}</a>
                                        </div>
                                    </div>
                                    <div className="statusMqtt">
                                        <div className={connectStatus === "Connected" ? "state-Connect" : "state-disConnect"}>
                                            <a>{connectStatus}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div2">
                    <div className="midbar-con2">
                        <div className="message">
                            <div className="top-mes">
                                <a>Message</a>
                            </div>
                            <div className="mes-his">
                                {payload.map((value, index) => (
                                    <div key={index} className="container-box-message">
                                        <div className="box-message">
                                            <a>Message {index + 1} : {value.topic} : {value.message}</a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="div3">
                    <div className="map">
                        <MyMap lat={latInput} lon={lonInput} />
                    </div>
                </div>

                <div className="div6">
                    <div className="Subcrib">
                        <div className="Sub-box">
                            <div className=""> <a>Subscriber</a></div>
                            <div className="info-con">
                                <div className="Topic">
                                    <label htmlFor="Topic-in">Topic input</label>
                                    <input value={topicInput} onChange={(e) => { SetTopicInput(e.target.value) }} className="Topic-in" type="text" id="topic" placeholder="Enter your topic" />
                                </div>
                                <div className="Qos">
                                    <label htmlFor="qos">Qos</label>
                                    <select value={qosInput} onChange={(e) => SetQosInput(Number(e.target.value))}>
                                        <option value={0}>0</option>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                    </select>
                                </div>
                                <div className="button-subcrib">
                                    <div className="subcribButton">
                                        <div className={!onClickSub ? "subcrib-CorD" : "subcrib-connected"} onClick={() => {
                                            if (connectStatus === "Connected" && topicInput != "") {
                                                SetSub(!onClickSub);
                                            } else {
                                                SetSub(false);
                                            }
                                        }}>
                                            <a>{onClickSub ? "Unsubscrib" : "Subscrib"}</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 