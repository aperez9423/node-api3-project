const express = require('express');
const userRouter = require("./users/userRouter")
const postRouter = require("./posts/postRouter")

const server = express();

server.use(express.json())

server.use(logger)

server.use("/users", userRouter)
server.use("/posts", postRouter)

server.use((err, req, res, next) => {
    console.log(err)

    res.status(500).json({
        message: "Something went wrong, please try again later."
    })
    next()
})
server.get('/', (req, res, next) => {
  res.status(200).json({
    message: `Welcome ${process.env.COHORT}`,
    quote: `${process.env.QUOTE_OF_THE_DAY}`,
  });
  next()
});

//custom middleware
server.use (logger)

function logger (req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url}`
  );

  next();
}

module.exports = server;
