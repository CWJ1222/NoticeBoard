// import { username, password } from "./main.js";

const mysql = require("mysql");
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: signupdb,
});

router.post("/main", (req, res) => {
  username = req.body.username;
  password = req.body.password;
  var sql = "INSERT INTO member (username, password) VALUES (?,?)";
  con.query(sql, [username, password], function (err, result) {
    if (err) {
      res.json({ message: false });
    } else {
      res.json({ message: username });
    }
    console.log("1 record inserted");
  });
});
