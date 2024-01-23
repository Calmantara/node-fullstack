const program = require("commander")
const http = require("./http")

program.
    version("1.0.0").
    description("our awesome server")

program.
    command("http-backend").
    description("run http server").
    action(() => {
        http.serveBackend()
    })
program.
    command("http-frontend").
    description("run http server").
    action(() => {
        http.serveFrontend()
    })

program.parse()
