const express = require("express");
const config = require("../config/local.json");
const { UserPostgres } = require("../src/repository/user")
const { UserRouter } = require("../src/router/user")
const { UserService } = require("../src/service/user")
const { connectDb } = require("../src/config/db")
const { UserController } = require("../src/controller/user");
const { Crypto } = require("../src/service/crypto");
const { Middleware } = require("../src/controller/middleware");


async function serveBackend() {
  const { app, dbMaster } = await prepare()

  // running server
  const server = app.listen(config.server.port, () => {
    console.log(`server is running on port ${config.server.port}`);
  });


  // events to shut down
  process.on("SIGTERM", expressGraceful(server, dbMaster));
  process.on("SIGINT", expressGraceful(server, dbMaster));
}

async function prepare() {
  // make db connection
  const { postgres, session } = config
  const dbMaster = await connectDb(postgres.master)
  // make express app
  const app = express();
  // middleware
  app.use(express.json());

  // class definitions
  const userRepo = new UserPostgres(dbMaster)
  const cryptoService = new Crypto(session)
  const userService = new UserService(userRepo, cryptoService)
  const userController = new UserController(userService)
  // middlware & router
  const middleware = new Middleware(cryptoService, userService)
  const userRouter = new UserRouter(app, middleware, userController)

  // mount all 
  userRouter.mountV1()
  return { app, dbMaster }
}

function expressGraceful(server, dbMaster) {
  return async () => {
    console.log("server is shutting down");
    server.close();

    console.log("close database connection");
    await dbMaster.close()
  };
}

module.exports = { serveBackend };
