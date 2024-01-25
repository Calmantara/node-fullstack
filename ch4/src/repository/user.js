const { User } = require("../model/user")
const { DataTypes, where } = require("sequelize")

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

class UserPostgres {
    constructor(sequelize) {
        User.init({
            username: DataTypes.STRING,
            password: DataTypes.STRING,
            dob: DataTypes.DATE
        }, { sequelize, modelName: 'user', tableName: "users" })
    }

    async createUser(user) {
        try {
            await User.create({
                username: user.username,
                password: "",
                dob: user.dob
            })
        } catch (error) {
            throw error;
        }
    }

    async getUsers() {
        try {
            const users = await User.findAll({
                where: { deletedAt: null }
            })
            return users
        } catch (error) {
            throw error;
        }
    }

    async getUserById(userId) {
        try {
            const user = await User.findOne({ where: { id: userId, deletedAt: null } })
            return user
        } catch (error) {
            throw error
        }
    }

    async updateUserDob(user) {
        try {
            const affected = await User.update({ dob: user.dob }, {
                where: {
                    id: user.id,
                    deletedAt: null
                }
            })
            return affected
        } catch (error) {
            throw error
        }
    }
}

module.exports = { UserPlaceholder, UserPostgres }