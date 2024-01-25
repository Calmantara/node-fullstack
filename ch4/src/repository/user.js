const User = require("../model/user")

class UserPlaceholder {
    async getUserById(id) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        const jsonRes = await response.json()

        const user = Object.assign(new User, jsonRes)
        return user
    }

    async getUsers() {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const jsonRes = await response.json()
        return jsonRes
    }
}

module.exports = UserPlaceholder