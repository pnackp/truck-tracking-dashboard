import { useState, useEffect } from "react";
import mqtt from "mqtt";

export function useMqttConnect() {
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState('Disconnected');
    const [payload, setPayload] = useState(null);

    const mqttConnect = (host, mqttOption) => {
        setConnectStatus('Connecting');
        setClient(mqtt.connect(`wss://${host}`, mqttOption));
    };

    const mqttDisconnect = () => {
        if (client) {
            client.end(() => {
                setConnectStatus('Disconnected');
            });
        }
    };

    useEffect(() => {
        if (!client) return;

        client.on('connect', () => { setConnectStatus('Connected'); console.log("connected") });
        client.on('reconnect', () => setConnectStatus('Reconnecting'));
        client.on('error', (err) => { console.error(err); client.end(); setConnectStatus('Error'); });
        client.on('message', (topic, message) => {
            setPayload({ topic, message: message.toString() });
        });

        return () => {
            client.end();
        };
    }, [client]);

    return { mqttConnect, connectStatus, payload, mqttDisconnect };
}

