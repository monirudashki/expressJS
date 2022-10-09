const bcrypt = require('bcrypt');
const User = require('../models/User');

async function register(username , password) {
    const existing = await User.findOne({username}).collation({ locale: 'en' , strength: 2});
    if(existing) {
        throw new Error('Username is taken!');
    };

    const hashedPassword = await bcrypt.hash(password , 10);

    const user = await User.create({
        username,
        hashedPassword
    });

    return {
        id: user._id,
        username,
        roles: user.roles
    }
}

async function login(username , password) {
    const user = await User.findOne({username}).collation({ locale: 'en' , strength: 2});
    if(!user) {
        throw new Error('Username or password is incorrect!');
    };

    const match = await bcrypt.compare(password , user.hashedPassword);

    if(!match) {
        throw new Error("Username or password is incorrect!");
    };

    return {
        id: user._id,
        username: user.username,
        roles: user.roles
    }
};

module.exports = {
    login,
    register
}