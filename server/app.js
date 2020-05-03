const express = require("express");
const path = require("path");
const app = express();

const createApp = () => {
  // body parsing middleware
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api", require("./api"));

  app.use(express.static(path.join(__dirname, "..", "public")));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
  });
};

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

createApp();
