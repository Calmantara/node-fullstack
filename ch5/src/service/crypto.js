const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { Claims, Token } = require("../model/token")
const moment = require("moment")

class Crypto {
    async generatePassword(password) {
        try {
            const salt = await bcrypt.genSalt(10)
            const hashed = await bcrypt.hash(password, salt)
            return hashed
        } catch (error) {
            throw error
        }
    }

    async comparePassword(password, hashed) {
        try {
            return await bcrypt.compare(password, hashed)
        } catch (error) {
            throw error
        }
    }

    async createUserToken(userData) {
        // membuat claim
        // sub, iss, iat, exp, aud, data
        const now = new Date()
        const exp = (Date.now() / 1000) + (60 * 60)
        const claims = new Claims(
            userData.id,
            ["node-fullstack.com"],
            now,
            exp,
            ["node-fullstack.com"],
            {
                "username": userData.username,
                "dob": userData.dob
            }
        )

        const expRefresh = (Date.now() / 1000) + (2 * 60 * 60)
        const refreshClaims = new Claims(
            userData.id,
            ["node-fullstack.com"],
            now,
            expRefresh,
            ["node-fullstack.com"],
            {
                "username": userData.username,
                "dob": userData.dob
            }
        )

        // membuat jwt accessToken dan refreshToken
        const accessToken = jwt.sign(JSON.stringify(claims), "thisissupersecretkey")
        const refreshToken = jwt.sign(JSON.stringify(refreshClaims), "thisissupersecretkey")

        // generate token model
        const tokens = new Token(accessToken, refreshToken)
        return tokens
    }
}

module.exports = { Crypto }