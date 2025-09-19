import "./Struck.css"
import { useState } from "react";
import ima from "../assets/delivery-truck.png"

export function Truck({ onLogout }) {
    const [boxes, setBoxes] = useState(0);
    const [value, setValue] = useState("Disconnected"); 

    const Deletetoken = () => {
        localStorage.removeItem("token")
        onLogout();
    }
    const Addbox = () => {
        if(boxes < 5*3){
            setBoxes(boxes + 1);
        }
    }

    return (
        <div className="container_t">
            <div className="box-t">
                <div className="t-bar">
                    <div className="t-title"><h1>Dash</h1></div>
                    <div className="Logout">
                        <button onClick={Deletetoken}>Logout</button>
                    </div>
                </div>
                <div className="box-m">
                    <div className="box-m-l">
                        <div className="box-t-m">
                            <div className="box-t1">
                                <a>Select your vehicle</a>
                            </div>
                            <div className="create-c">
                                <div className="main-box">
                                    <button onClick={Addbox}>Add</button>
                                </div>
                            </div>
                        </div>
                        <div className="box-b-l">
                            <div className="box-in">
                                <div className="size-b">
                                    {[...Array(boxes)].map((_, index) => (
                                        <div className="box-click" key={index}>
                                            <div className="in-box-c">
                                                <div className="images">
                                                    <img src={ima} alt="truck" />
                                                </div>
                                                <div className="Title-t"><h1>Truck 001</h1></div>
                                                <div className="status">
                                                    <a style={{ color: value === "Connected" ? "green" : "red" }}>
                                                        {value}
                                                    </a>
                                                </div>
                                                <div className="token-gen"><a>token</a></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="box-r">
                        <div className="main-r">
                            <div className="box-t-m-r">
                                <div className="box-t2">
                                    <a>Statistics</a>
                                </div>
                            </div>
                            <div className="Data">
                                <div className="bd">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}