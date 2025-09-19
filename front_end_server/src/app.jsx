import { useState } from "react";
import { Login } from "./pages/Login";
import { Truck } from "./pages/Struck";

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <div>
      {!token ? (
        <Login onLogin={setToken} />  
      ) : (
        <Truck onLogout={() => setToken(null)} />  
      )}
    </div>
  );
}
