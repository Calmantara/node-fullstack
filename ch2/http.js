const express = require("express")
const config = require("./config.json")
const fileSystem = require("fs")

// model
const {User, UserReq} = require("./src/model/user")
const moment = require("moment")

function serveBackend() {
    // make express app
    const app = express()

    // Challenge 1:
    // refactor file system API
    // dengan menggunakan Express

    // ex: membuat BE server
    // untuk create user data

    // middleware
    app.use(express.json())

    // router
    // GET, POST, PUT, PATCH, DELETE
    const apiV1 = "/api/v1"

    app.get(`${apiV1}/timestamp`, (req, res) => {
        const buf = fileSystem.readFileSync("./log.txt", 'utf8')
        const data = buf.split("\n")
        // get last data
        let dataRes = "timestamp 1"
        if (data.length > 1) {
            dataRes = data[data.length - 1]
        }
        // write data
        const datFile = dataRes.split(" ")
        if (data.length > 0 && data[0] !== "") {
            fileSystem.appendFileSync("./log.txt", `\ntimestamp ${Number(datFile[1]) + 1}`)
        } else {
            fileSystem.writeFileSync("./log.txt", dataRes)
        }
        res.setHeader("Content-Type", "text/html")
        res.send(dataRes)
    })

    app.get(`${apiV1}/users/:userId`, (req, res) => {
        console.log(req.params)
        res.json({
            "param": req.params,
            "query": req.query
        })
    })

    const usersArr = []
    app.post(`${apiV1}/users`, (req, res) => {
        const payload = req.body
        console.log("appending req to array")
        usersArr.push(payload)

        res.statusCode = 201
        res.setHeader("Content-Type", "application/json")
        res.json({ "message": "user created" })
    })

    app.get(`${apiV1}/users`, (req, res) => {
        res.json({
            "message": "success fetch users",
            "data": usersArr
        })
        res.statusCode = 200
    })

    // Challenge 2:
    // buat suatu file untuk store users (json)
    // API:
    // user:
    //  {id, name, email, dob, deletedAt}
    // 1. create user 
    // 2. get all users that not deleted
    // 3. get user by id that not deleted 
    // (kalau udah didelete / tidak ketemu akan 404)
    // 4. update user DOB by id
    // 5. delete user (soft delete)

    const apiV2 = "/api/v2"

    app.
        route(`${apiV2}/users`).
        get(async (req, res) => {
            // read files
            const resUsers = []
            try {
                const file = fileSystem.readFileSync(config.storage.user)
                const fileJson = JSON.parse(file)
                // loop for checking deleted users
                fileJson.forEach(element => {
                    if (element["deletedAt"] === undefined ||
                        element["deletedAt"] === null) {
                        resUsers.push(element)
                    }
                });
            } catch (err) {
                console.log(`err when opening file ${err}`)
            }
            // construct response
            res.statusCode = 200
            res.json({
                "message": "successful fetching user",
                "data": resUsers
            })
        }).
        post(async (req, res) => {
            const payload = req.body
            const newUser = Object.assign(new UserReq, payload)

            // validate body
            if (!newUser.isValid()) {
                res.statusCode = 400
                res.json({
                    "message": "invalid body request",
                    "errors": []
                })
                return
            }

            try {
                const file = fileSystem.readFileSync(config.storage.user)
                const fileJson = JSON.parse(file)
                // add id and push to array
                newUser.id = fileJson.length + 1
                fileJson.push(newUser)
                // Writing to JSON file 
                fileSystem.writeFile(config.storage.user, JSON.stringify(fileJson), (err) => {
                    // Error checking 
                    if (err) throw err;
                    console.log("new data added");
                });
            }
            catch (err) {
                try {
                    newUser.id = 1
                    const userArr = [newUser]
                    fileSystem.writeFileSync(config.storage.user, JSON.stringify(userArr), (err) => {
                        // Error checking 
                        if (err) throw err;
                        console.log("data initialized");
                    })
                }
                catch (error) {
                    console.log(`err when processing file file ${err}`)
                    res.statusCode = 500
                    res.json({
                        "message": "something went wrong",
                        "errors": []
                    })
                }
            }
            // construct user
            res.statusCode = 201
            res.json({
                "message": "successful fetching user",
                "data": payload
            })
        })

    // add GET, PUT, and DELETE specific
    app.
        route(`${apiV2}/users/:userId`).
        get(async (req, res) => {
            try {
                const file = await fileSystem.readFile(config.storage.user)
                const fileJson = JSON.parse(file)

                // loop for checking deleted users
                fileJson.forEach(element => {
                    if (element.id == req.params["userId"] && (element["deletedAt"] === undefined ||
                        element["deletedAt"] === null)) {
                        res.statusCode = 200
                        res.json({
                            "message": "successful fetching user",
                            "data": element
                        })
                        return
                    }
                    // not found 
                    res.statusCode = 404
                    res.json({
                        "message": "user not found",
                        "data": null
                    }) 
                    return
                });

            } catch (error) {
                console.log(`err when processing file file ${err}`)
                res.statusCode = 500
                res.json({
                    "message": "something went wrong",
                    "errors": []
                })
            }
        }).
        put(async (req, res) =>{
            const payload = req.body.dob
            if (payload === undefined){
                res.statusCode = 400
                res.json({
                    "message": "invalid body request",
                    "errors": []
                })
                return
            }

            try {
                const file = fileSystem.readFileSync(config.storage.user)
                const fileJson = JSON.parse(file)

                // loop for checking deleted users
                fileJson.forEach((element, idx) => {
                    if (element.id == req.params["userId"] && (element["deletedAt"] === undefined ||
                        element["deletedAt"] === null)) {
                        // update DOB
                        element.dob = payload
                        try {
                            fileJson[idx] = element
                            fileSystem.writeFileSync(config.storage.user, JSON.stringify(fileJson), (err) => {
                                // Error checking 
                                if (err) throw err;
                                console.log("data updated");
                            })
                        } catch (error) {
                            console.log(`err when processing file file ${err}`)
                            res.statusCode = 500
                            res.json({
                                "message": "something went wrong",
                                "errors": []
                            })
                            return
                        }

                        res.statusCode = 200
                        res.json({
                            "message": "successful update user",
                            "data": element
                        })
                        return
                    }
                    // not found 
                    res.statusCode = 404
                    res.json({
                        "message": "user not found",
                        "data": null
                    }) 
                    return
                });

            } catch (error) {
                console.log(`err when processing file file ${err}`)
                res.statusCode = 500
                res.json({
                    "message": "something went wrong",
                    "errors": []
                })
            }
        }).
        delete(async (req, res) => {
            try {
                const file = fileSystem.readFileSync(config.storage.user)
                const fileJson = JSON.parse(file)

                // loop for checking deleted users
                fileJson.forEach((element, idx) => {
                    if (element.id == req.params["userId"] && (element["deletedAt"] === undefined ||
                        element["deletedAt"] === null)) {
                        // update DOB
                        element["deletedAt"] = moment.now()
                        try {
                            fileJson[idx] = element
                            fileSystem.writeFileSync(config.storage.user, JSON.stringify(fileJson), (err) => {
                                // Error checking 
                                if (err) throw err;
                                console.log("data updated");
                            })
                        } catch (error) {
                            console.log(`err when processing file file ${err}`)
                            res.statusCode = 500
                            res.json({
                                "message": "something went wrong",
                                "errors": []
                            })
                        }

                        res.statusCode = 200
                        res.json({
                            "message": "successful delete user",
                            "data": element
                        })
                        return
                    }
                    // not found 
                    res.statusCode = 404
                    res.json({
                        "message": "user not found",
                        "data": null
                    }) 
                    return
                });

            } catch (error) {
                console.log(`err when processing file file ${err}`)
                res.statusCode = 500
                res.json({
                    "message": "something went wrong",
                    "errors": []
                })
            } 
        })

        // user: {name, email, password}
        // /api/v1/users/:userId?

    // running server
    const server = app.listen(config.server.port, () => {
        console.log(`server is running on port ${config.server.port}`)
    })

    // events to shut down
    process.on("SIGTERM", expressGraceful(server))
    process.on("SIGINT", expressGraceful(server))

    // bagaimana caranya kita buat graceful
    function expressGraceful(server) {
        return () => {
            console.log("server is shutting down")
            server.close()
        }
    }
}

function serveFrontend() {
    // make express app
    const app = express()
    // middleware
    app.use(express.static(config.static.path))
    app.set("view engine", "ejs")
    // running server
    const server = app.listen(8080, () => {
        console.log(`server is running on port ${8080}`)
    })
    app.get("/users", async (req, res) => {
        const file = fileSystem.readFileSync(config.storage.user)
        const users = JSON.parse(file)
        res.render("user", {"users":users})
    })
    // events to shut down
    process.on("SIGTERM", expressGraceful(server))
    process.on("SIGINT", expressGraceful(server))

    // bagaimana caranya kita buat graceful
    function expressGraceful(server) {
        return () => {
            console.log("server is shutting down")
            server.close()
        }
    }
}

module.exports = { serveBackend, serveFrontend }