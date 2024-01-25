const program = require("commander")
const graphql = require("./graphql")


program.
    version("1.0.0").
    description("our awesome server")

program.
    command("http").
    description("run http server").
    action(() => {
        // http.serveBackend()
    })
program.
    command("graphql").
    description("run graphql server").
    action(() => {
        graphql.serve()
    })

program.parse()
