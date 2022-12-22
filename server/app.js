const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const cors = require("cors");
const chalk = require("chalk");
const routes = require("./routes");
const path = require("path");

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log(`Client with id ${socket.id} connected`);

  socket.on("message", (message) => {
    console.log("Message: ", message);
  });

  socket.on("disconnect", () => {
    console.log(`Client with id ${socket.id} disconnected`);
  });
});

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());
app.use(function (req, res, next) {
  req.io = io;
  next();
});

app.use("/api", routes);

const PORT = config.get("port") ?? 8080;

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client")));

  const indexPath = path.join(__dirname, "client", "index.html");

  app.get("*", (req, res) => {
    res.sendFile(indexPath);
  });
}

async function start() {
  try {
    await mongoose.connect(config.get("mongoUri"));
    console.log(chalk.green(`MongoDB connected`));
    http.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`));
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}
start();
