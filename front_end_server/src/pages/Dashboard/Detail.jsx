import "./Detail.css"
import { use, useEffect, useState } from "react"
import { useMqttConnect } from "../component/mqtt/mqtt";

export function Dashboard({ backEvent, container, setContainer }) {
    const pages = localStorage.getItem("Pages");
    const currentItem = container.find(item => item.title === pages) || {};
    const [serverInput, setServerInput] = useState(currentItem.server || "");
    const [usernameInput, setUsernameInput] = useState(currentItem.username || "");
    const [passwordInput, setPasswordInput] = useState(currentItem.password || "");

    const { mqttConnect, connectStatus, payload , mqttDisconnect } = useMqttConnect();

    const [onConnect, Setconnect] = useState(false);

    useEffect(() => {
        if (onConnect) {
            if (serverInput != "") {
                setContainer(prev => prev.map(item => {
                    if (item.title === pages) {
                        return {
                            ...item,
                            server: serverInput,
                            username: usernameInput,
                            password: passwordInput
                        };
                    }
                    return item;
                }));
                mqttConnect(serverInput, {
                    username: usernameInput,
                    password: passwordInput,
                    clientId: "myClient_" + Math.random().toString(16).substr(2, 8),
                    clean: true,
                    connectTimeout: 4000,
                })
            } else {
                console.log("Blank server ip");
            }
        }else{
            mqttDisconnect();
        }
    }, [onConnect])

    return (
        <div className="container-Dashboard">
            <div className="topbar-Dashboard">
                <div className="topbar-left-name">
                    <a>{localStorage.getItem("Pages")}</a>
                </div>
                <div className="topbar-right-button">
                    <div className="goBackbutton" onClick={()=>{Setconnect(false);backEvent()}}>
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
                                    <input onChange={(e) => { setServerInput(e.target.value) }} key="server" value={serverInput} className="Server-in" type="text" id="server" placeholder="Sever ip and Port" />
                                </div>
                                <div className="Up">
                                    <div className="username">
                                        <label htmlFor="username-in">Username</label>
                                        <input key="username" onChange={(e) => { setUsernameInput(e.target.value) }} value={usernameInput} className="username-in" type="text" id="username" placeholder="Enter Username to connect" />
                                    </div>
                                    <div className="password">
                                        <label htmlFor="password-in">Password</label>
                                        <input key="password" value={passwordInput} onChange={(e) => { setPasswordInput(e.target.value) }} className="password-in" type="password" id="password" placeholder="Enter Password to connect" />
                                    </div>
                                </div>
                                <div className="buttonAnPro">
                                    <div className="ConnectButton">
                                        <div
                                            className={onConnect ? 'button-connected' : 'button-CorD'}
                                            onClick={() => {
                                                if (!serverInput) {
                                                    Setconnect(false); 
                                                } else {
                                                    Setconnect(!onConnect);
                                                }
                                            }}>
                                            {!onConnect? "Connect" : "Disconnect"}
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

                    </div>
                </div>
                <div className="div3">
                    <div className="map">

                    </div>
                </div>
                <div className="div6">
                    <div className="Subcrib">

                    </div>
                </div>
            </div>
        </div>
    )
}