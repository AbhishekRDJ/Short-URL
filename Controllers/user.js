const User = require("../Models/user")
const { v4: uuidv4 } = require('uuid');

const {setUser,getUser}= require("../Service/Auth")

async function handelUserSignup(req, res) {
    const { name, email, password } = req.body;
    await User.create({ name, email, password })
    return res.redirect('/login')
}
async function handelUserLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password })
    if (!user) {
        return res.render('login', {
            error: 'invalid Username or password'
        })
    }
    const sessionId = uuidv4();
    setUser(sessionId,user)
    res.cookie("uid",sessionId)
    return res.redirect('/')
}

module.exports = {
    handelUserSignup, handelUserLogin,
}