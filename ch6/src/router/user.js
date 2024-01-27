class UserRouter {
    constructor(app, middleware, userController) {
        this.userController = userController
        this.middleware = middleware
        this.app = app
    }

    mountV1() {
        // mount all
        const v1 = "/api/v1"

        // User Session
        this.app.post(`${v1}/users/login`, async (req, res) => {
            this.userController.userLogin(req, res)
        })

        this.app.use((req, res, next) => {
            this.middleware.authenticate(req, res, next)
        })

        // [GET, POST] /api/v1/users 
        const users = this.app.route(`${v1}/users`)
        users.get(async (req, res) => {
            this.userController.getUsers(req, res)
        })
        users.post(async (req, res) => {
            this.userController.createUser(req, res)
        })

        // [GET, PUT] /api/v1/users/:userId
        const userId = this.app.route(`${v1}/users/:userId`)
        userId.get(async (req, res) => {
            this.userController.getUserById(req, res)
        })
        userId.put(async (req, res) => {
            this.userController.updateUserDob(req, res)
        })

    }
}

module.exports = { UserRouter }