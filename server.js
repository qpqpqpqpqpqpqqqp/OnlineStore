const express = require("express")
const session = require("express-session")
const MongoDBStore = require("connect-mongodb-session")(session)
const bodyParser = require("body-parser")
const connectDB = require("./config/db");
const config = require("./config/database.config");
const path = require("path");
const mongoURI = config.url;
const app = express();

connectDB().then(() => console.log("Database Connected Successfully!!"))

const store = new MongoDBStore({
    uri: mongoURI,
    collection: "mySessions",
})

app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        store: store,
    })
) //stores the session

app.use('/admin', require("./routes/admin-main-page"))
app.use('/seller', require("./routes/seller-main-page"))
app.use('/', require("./routes/login-page"))
// app.get('/trident', (req, res) => res.render(path.resolve('./front/trident.ejs')))

app.use('/home', require("./routes/root"))
app.use('/cloth', require("./routes/clothes"))
app.use('/shoes', require("./routes/shoes"))
app.use('/accessories', require("./routes/accessories"))
app.use('/profile', require("./routes/profile"))

let port = process.env.PORT;
if (port == null || port == "") {
    port = 3000;
}

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}/home`)
);