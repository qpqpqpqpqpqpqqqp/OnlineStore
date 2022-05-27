const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    if (req.session.token) {
        let token = jwt.verify(req.session.token, process.env.SECRET_JWT)
        if (token.role === 2) return next()
    }

    req.session.error = "You have to Login first"
    res.redirect("/login")
};