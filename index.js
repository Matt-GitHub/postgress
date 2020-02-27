const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const port = process.env.PORT || 2390;
const userRouter = require("./api/index");
const server = express();

server.use(express.json());
server.use(helmet());
server.use(cors());
server.use("/api", userRouter);

server.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
