const { Sequelize, Model, DataTypes } = require("sequelize")


class User extends Model { }

async function serve() {
    // define connection and user model
    const sequelize = new Sequelize('postgres://postgres:mysecretpassword@127.0.0.1:15432/cinema')
    User.init({
        username: DataTypes.STRING,
        dob: DataTypes.DATE
    }, { sequelize, modelName: 'user' });

    try {
        // test connection
        await sequelize.authenticate()
        console.log("successful connecting")
    } catch (err) {
        console.log(`error connecting to db ${err}`)
    }

    // create jane
    (async () => {
        await sequelize.sync();
        try {
            const jane = await User.create({
                username: 'janedoe',
                dob: new Date(1980, 6, 20)
            });
        } catch (err) {
            console.log(`error in database execution ${err}`)
        }
    })();
    // POST /api/v1/users
}

module.exports = { serve }