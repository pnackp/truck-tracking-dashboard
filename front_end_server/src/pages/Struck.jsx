import "./Struck.css"
import { useState } from "react"
export function Select() {
    return (
        <div className="container_t">
            <div className="main_t">
                <div className="main-l">
                    <div className="box-l">
                        <div className="box-sel">
                            <div className="title_box">
                                <h1>Hi!! nack</h1>
                            </div>
                            <div className="detail-box">
                                <a>You can easily add widgets by sending a JSON payload to our API.</a>
                            </div>
                            <div className="howto">
                                <div className="First-step">
                                    <div className="titel"><a>1.Prepare your Json</a></div>
                                    <div className="code-box">
                                        <pre>
                                            <code>
                                                {`{
    id: your id,
    vehicle  : name,
    username : username,
    password : password,
}`
                                                }
                                            </code>
                                        </pre>
                                    </div>
                                    <div>

                                    </div>
                                </div>
                                <div className="Second-step">
                                   <div className="titel-sd"><a>2.sent to Api</a></div>
                                    <div className="code-boxt">
                                        <pre>
                                            <code>
                                                {`{
    https://127.0.0.1/3000/login
}`
                                                }
                                            </code>
                                        </pre>
                                    </div> 
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="main-r">
                    <div className="box-r">

                    </div>
                </div>
            </div>
        </div>
    )
}