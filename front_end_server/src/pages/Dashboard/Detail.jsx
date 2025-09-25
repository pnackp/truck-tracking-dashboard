import "./Detail.css"
import { useState } from "react"
export function Detailb() {
    return (
        <div className="container_de">
            <div className="main-de">
                <div className="top-de">
                    <div className="topl-de">
                        <a>Payload 1</a>
                    </div>
                    <div className="topr-de">
                        <div className="main-widget">
                            <div className="Add-widget" ><a>Add widget</a></div>
                        </div>
                        <div className="Select-de">
                            <div className="widget-map">
                                <div className="box-map" >
                                    <a>Map</a>
                                </div>
                            </div>
                            <div className="widget-value" >
                                <div className="box-value">
                                    <a>Value</a>
                                </div>
                            </div>
                            <div className="widget-graph">
                                <div className="box-graph">
                                    <a>Graph</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mid-de">
                    
                </div>
            </div>
        </div>
    )
}