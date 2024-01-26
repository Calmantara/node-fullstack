const program = require("commander")
const sequelize = require("./cmd/sequelize")
const http = require("./cmd/http")


program.
    version("1.0.0").
    description("our awesome server")

program.
    command("http").
    description("run http server").
    action(() => {
        http.serveBackend()
    })
program.parse()