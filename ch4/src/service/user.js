const { User } = require("../model/user")

class UserService {
    constructor(userRepo) {
        this.userRepo = userRepo
    }

    async createUser(user) {
        try {
            // membuat hash password
            await this.userRepo.createUser(user)
        } catch (error) {
            throw error
        }
    }

    async getUsers() {
        try {
            const users = await this.userRepo.getUsers()
            return users
        } catch (error) {
            throw error
        }
    }

    async updateUserDob(user) {
        try {
            const affected = await this.userRepo.updateUserDob(user)
            return affected
        } catch (error) {
            throw err
        }
    }

    async getUserById(userId) {
        try {
            const user = await this.userRepo.getUserById(userId)
            return user
        } catch (error) {
            throw error
        }
    }
}

module.exports = { UserService }