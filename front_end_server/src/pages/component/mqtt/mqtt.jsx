import { useState, useEffect, use } from "react";
import mqtt from "mqtt";

export function useMqttConnect({setPayload}) {
    const [client, setClient] = useState(null);
    const [connectStatus, setConnectStatus] = useState('Disconnected');
    const [isSub, setIsSub] = useState(null);

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

    const mqttSub = (topic, qos) => {
        if (!client || connectStatus !== "Connected") {
            console.log("Cannot subscribe, not connected yet");
            return;
        }

        client.subscribe(topic, { qos }, (error) => {
            if (error) {
                console.log('Subscribe to topics error', error);
                return;
            }
            setIsSub(true);
            console.log("Subscribed to", topic);
        });
    };


    const mqttUnSub = (topic) => {
        if (client) {
            client.unsubscribe(topic, error => {
                if (error) {
                    console.log('Unsubscribe error', error);
                    return;
                }
                setIsSub(false);
            });
        }
    };

    useEffect(() => {
        if (!client) return;

        client.on('connect', () => { setConnectStatus('Connected'); console.log("connected") });
        client.on('reconnect', () => setConnectStatus('Reconnecting'));
        client.on('error', (err) => { console.error(err); client.end(); setConnectStatus('Error'); });
        client.on('message', (topic, message) => {
            setPayload(prev => [{ topic, message: message.toString() }, ...prev]);
        });

        return () => {
            client.end();
        };
    }, [client]);

    return { mqttConnect, connectStatus, mqttDisconnect, mqttSub, mqttUnSub };
}

