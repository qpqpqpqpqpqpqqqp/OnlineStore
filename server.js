const express = require("express")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
const bodyParser = require("body-parser")
const methodOverride = require("method-override")
const connectDB = require("./config/db");
const config = require("./config/database.config")
const mongoURI = config.url;
const app = express();

connectDB().then(() => console.log("Database Connected Successfully!!"))

const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
})

app.set('view engine','ejs')
app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(
    session({
        secret: 'secret',
        // secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        store: store,
    })
) //stores the session

app.use('/', require("./routes/product-routes"))
app.use('/', require("./routes/login-page"))

app.use('/cart', require("./routes/cart"))
app.use('/profile', require("./routes/profile"))
app.use('/admin', require("./routes/admin-main-page"))
app.use('/seller', require("./routes/seller-main-page"))

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}/home`)
);