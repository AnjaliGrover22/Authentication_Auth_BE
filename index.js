const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./dbinit");
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");

const PORT = process.env.PORT || 8081;

// Necessary middleware
app.use(cors());
app.use(express.json());

connectDB();

app.use("/user", userRoute);
app.use("/posts", postRoute);

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/", (req, res) => {
  res.send("Express/JWT");
});

app.listen(PORT, () => {
  console.log(`running on http://localhost:${PORT}`);
});
