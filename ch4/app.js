const program = require("commander")
const graphql = require("./cmd/graphql")
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
program.
    command("graphql").
    description("run graphql server").
    action(() => {
        graphql.serve()
    })

program.
    command("sequelize").
    description("run sequelize test").
    action(() => {
        sequelize.serve()
    })

program.parse()
