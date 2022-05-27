const express = require("express")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
const passport = require('passport')
const bodyParser = require("body-parser")
const methodOverride = require("method-override")

const connectDB = require("./config/db");
const config = require("./config/database.config")
const jwt = require("jsonwebtoken");
const mongoURI = config.url;
require('dotenv').config()

const app = express();

connectDB().then(() => console.log("Database Connected Successfully!!"))

const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
})

require('./config/passport')(passport);

app.set('view engine', 'ejs')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
) //stores the session
app.use(passport.initialize())
app.use(passport.session())

app.use('/', require("./routes/product-routes"))
app.use('/', require("./routes/login-page"))

app.use('/cart', require("./routes/cart"))
app.use('/profile', require("./routes/profile"))
app.use('/admin', require("./routes/admin-main-page"))
app.use('/seller', require("./routes/seller-main-page"))

app.get("/auth/google",
    passport.authenticate('google', {scope: ["profile"]})
)

const generateToken = (id, role) => {
    const payload = {id, role}
    return jwt.sign(payload, process.env.SECRET_JWT, {expiresIn: "12h"})
}

app.get('/auth/google/OnlineStore',
    passport.authenticate('google', {
        failureRedirect: '/login'
    }), function (req, res) {
        req.session.username = req.user.username;
        req.session.token = generateToken(req.user.googleId, 0)
        req.session.email = req.user.email;
        req.session.phone = req.user.phone;
        req.session.city = req.user.city;
        req.session.postIndex = req.user.postIndex;
        // console.log(req.user)
        res.redirect('/profile');
    }
);

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}/home`)
);