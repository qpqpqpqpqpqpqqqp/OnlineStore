const express = require("express");
const bodyParser = require("body-parser")
const app = express();
const mongoose = require('mongoose');
const dbConfig = require('./config/database.config.js');
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.set('view engine','ejs')

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database Connected Successfully!!");
}).catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
});


app.use('/user',require("./routes/User"))

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