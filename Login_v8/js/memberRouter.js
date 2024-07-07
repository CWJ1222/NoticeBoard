// import { username, password } from "./main.js";

router.post("/main", (req, res) => {
  console.log(req.body);
  username = req.body.username;
  password = req.body.password;
  var sql = "SELECT * FROM member WHERE username =? and password =?";
  con.query(sql, [username, password], function (err, result) {
    if (err) {
      res.json({ message: false });
    } else {
      req.session.username = username;
      res.json({ message: result[0].name });
    }
    console.log(result);
  });
});
