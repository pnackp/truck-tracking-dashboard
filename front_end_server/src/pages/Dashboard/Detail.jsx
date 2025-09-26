import "./Detail.css"
import { useState } from "react"

export function Dashboard({ backEvent }) {
    return (
        <div className="container-Dashboard">
            <div className="topbar-Dashboard">
                <div className="topbar-left-name">
                    <a>{localStorage.getItem("Pages")}</a>
                </div>
                <div className="topbar-right-button">
                    <div className="goBackbutton" onClick={backEvent}>
                        <a>Back</a>
                    </div>
                </div>
            </div>
            <div className="midbar-Dashboard">
                
            </div>
        </div>
    )
}