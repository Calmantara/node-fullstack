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
        const t = await sequelize.transaction();
        try {
            const jane = await createUser(t, "jane2", new Date(1980, 6, 20));
            const doe = await createUser(t, "doe2", new Date(1980, 6, 20));
            await t.commit()
        } catch (err) {
            console.log(`error in database execution ${err}`)
            await t.rollback()
        }
    })();
    // POST /api/v1/users
}

async function createUser(t, username, dob) {
    return await User.create({
        username: username,
        dob: dob,
    }, { transaction: t })
}

module.exports = { serve }