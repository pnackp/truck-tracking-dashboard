import mqtt from "mqtt";
import { useState, useEffect, useRef } from "react";

export function useMqtt(boxes) {
  const clientsRef = useRef({});
  const [statuses, setStatuses] = useState({}); 
  const [messages, setMessages] = useState([]); 

  useEffect(() => {
    boxes.forEach((box) => {
      if (clientsRef.current[box.clientId]) return;

      const client = mqtt.connect(`${box.pro}${box.server}:${box.port}`, {
        username: box.user,
        password: box.pass,
        clientId: box.clientId,
      });

      client.on("connect", () => {
        setStatuses((prev) => ({
          ...prev,
          [box.clientId]: "Connected",
        }));
      });

      client.on("reconnect", () => {
        setStatuses((prev) => ({
          ...prev,
          [box.clientId]: "Reconnecting",
        }));
      });

      client.on("close", () => {
        setStatuses((prev) => ({
          ...prev,
          [box.clientId]: "Disconnected",
        }));
      });

      client.on("error", (err) => {
        console.error(`(${box.clientId}) error:`, err);
        setStatuses((prev) => ({
          ...prev,
          [box.clientId]: "Error",
        }));
      });

      client.on("message", (topic, message) => {
        setMessages((prev) => [
          ...prev,
          {
            clientId: box.clientId,
            topic,
            message: message.toString(),
          },
        ]);
      });

      // เก็บ client ไว้ใน ref
      clientsRef.current[box.clientId] = client;
    });

    // cleanup เมื่อ component unmount
    return () => {
      Object.values(clientsRef.current).forEach((c) => c.end());
      clientsRef.current = {};
    };
  }, [boxes]);

  return {
    clients: clientsRef.current,
    statuses,
    messages,
  };
}
