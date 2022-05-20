module.exports = (req, res, next) => {
    if (req.session.isAuth && req.session.isSeller) {
        next();
    } else {
        req.session.error = "You have to Login first";
        res.redirect("/login");
    }
};