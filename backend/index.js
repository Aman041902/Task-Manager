const express = require("express");
const app = express();

require("./connection/database");

const cors = require("cors");

app.use(cors());
app.use(express.json());
const userapi = require("./routes/route");
const taskapi = require("./routes/taskroute");

const port = 1000;

app.use("/api/v1", userapi);
app.use("/api/v2", taskapi);
// app.use("/", (req, res) => {
//   res.send("hello123");
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
