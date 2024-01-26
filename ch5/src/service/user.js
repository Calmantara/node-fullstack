const { ErrorMessage } = require("../model/response")
const { User } = require("../model/user")

class UserService {
    constructor(userRepo, cryptoService) {
        this.userRepo = userRepo
        this.cryptoService = cryptoService
    }

    async createUser(user) {
        try {
            // membuat hash password
            const { password } = user
            const hashed = await this.cryptoService.generatePassword(password)
            user.password = hashed

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

    async userLogin(user) {
        try {
            // get user by username
            const userData = await this.userRepo.getUserByUsername(user.username)
            // compare password
            const hashedPassword = userData.password
            const plainPassword = user.password
            const isMatch = await this.cryptoService.comparePassword(plainPassword, hashedPassword)
            if (!isMatch) {
                throw new Error(ErrorMessage.ERROR_INVALID_PASSWORD)
            }

            // generate token
            const tokens = await this.cryptoService.createUserToken(userData)
            return tokens
        } catch (error) {
            throw error
        }
    }
}

module.exports = { UserService }