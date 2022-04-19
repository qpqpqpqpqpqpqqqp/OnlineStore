const express = require("express");
const bodyParser = require("body-parser")
// const ejs = require("ejs")
const app = express();
const port = 3000;
app.set('view engine','ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))

app.use('/home', require("./routes/root"))
app.use('/cloth', require("./routes/clothes"))
app.use('/shoes', require("./routes/shoes"))
app.use('/accessories', require("./routes/accessories"))
app.use('/profile', require("./routes/profile"))

app.listen(port, () =>
    console.log(`App listening at http://localhost:${port}/home`)
);