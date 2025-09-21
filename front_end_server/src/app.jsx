import { useState } from "react";
import { Login } from "./pages/Login";
import { Truck } from "./pages/Struck";
import { Check_token } from "./pages/component/manage_token/mn_token";
export default function App() {
  const [token, setToken] = useState(Check_token("token_login"));
  return (
    <div>
      {!token ? (
        <Login onLogin={setToken} />  
      ) : (
        <Truck onLogout={setToken}/>  
      )}
    </div>
  );
}
// ถ้า ใน local storage มี token อยู๋เเล้วให้ไปหน้า dashboard ทันที 
// if have token in storage go to dashboard page

// <login> is call func login in login.jsx