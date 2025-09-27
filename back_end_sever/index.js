const express = require('express');
const app = express();
const pool = require('./db');
app.use(express.json());
const jwt = require('jsonwebtoken');
const cors = require("cors");

app.use(cors());


app.post('/updateContainer', async (req, res) => {
  const token = req.body.token;
  console.log(req.body);
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, "login_only");
    const username = decoded.username;
    const container = req.body.container;

    await pool.query(
      'UPDATE users SET container=$1 WHERE username=$2',
      [container, username]
    );
    console.log(container);
    res.json({ status: true });
  } catch (err) {
    console.error(err);
    res.status(401).json({ authorized: false, message: "Invalid or expired token" });
  }
});

app.post('/Checklogin',async(req,res)=>{
  console.log(req.body);
  const token = req.body.token;
  if(token){
    const result = await pool.query(
      'SELECT * FROM users WHERE token = $1',
      [token]
    );
    if(result.rows.length > 0){
      res.json({ status: true });
    }else{
      res.status(401).json({ status: false, message: "Invalid or expired token" });
    }
  }
  else{
    res.status(401).json({ status: false, message: "Invalid or expired token" });
  }
})


app.post('/Login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username=$1 AND password=$2',
      [username, password]
    );

    if (result.rows.length > 0) {
      if (!result.rows[0].token) {
        const token_login = jwt.sign({ username }, "login_only", { expiresIn: '1h' });
        res.json({ token: token_login, container_box: result.rows[0].container });
        await pool.query(
          'UPDATE users SET token=$1 WHERE username=$2 AND password=$3',
          [token_login, username, password]
        );
      } else {
        res.status(401).json({ message: "Please Logout other device" });
        console.log("Please Logout other device")
      }
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/Logout", async (req, res) => {
  const token = req.body.token;
  if (!token) {
    return res.status(400).json({ message: "No token provided" });
  }

  try {
    const check = await pool.query(
      'SELECT username, container FROM users WHERE token = $1',
      [token]
    );

    if (check.rows.length === 0) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
    await pool.query(
      'UPDATE users SET token = NULL WHERE token = $1',
      [token]
    );

    console.log("Logout user:", check.rows[0].username);
    console.log("Container:", check.rows[0].container);

    res.json({ status: true, message: "Logout successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});



app.listen(3000, () => console.log('Server running on http://localhost:3000'));
