const express = require("express")
const { graphqlHTTP } = require("express-graphql")
const { buildSchema } = require("graphql")
const UserRepository = require("../src/repository/user")

function serve() {
    const { userRepo } = prepare()
    // Construct a schema, using GraphQL schema language
    var schema = buildSchema(`
        type Query {
            users : [User]
            user(id: Int!): User
        },
        type User{
            id: Int!
            name: String
        }
        `)

    // The root provides a resolver function for each API endpoint
    var root = {
        users: async () => {
            const data = await userRepo.getUsers()
            return data
        },
        user: async (payload) => {
            const data = await userRepo.getUserById(payload.id)
            return data
        }
    }

    var app = express()
    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            rootValue: root,
            graphiql: true,
        })
    )
    app.listen(4000)
    console.log("Running a GraphQL API server at http://localhost:4000/graphql")
}

function prepare() {
    // repository
    const userRepo = new UserRepository()

    return { userRepo }
}

module.exports = { serve }