const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "siriusblack101!",
  database: "ace_interviews",
});

connection.connect((err) => {
  if (err) {
    console.error("error connecting to database");
    return;
  }
  console.log("connected to MySQL database");
});

module.exports = connection;
