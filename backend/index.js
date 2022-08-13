const Express = require('express');
const mongoose = require('mongoose');
const pinRoute = require('./routes/pins');
const dotenv = require("dotenv");

dotenv.config();

mongoose
.connect(process.env.NODE_MAPBOX_TOKEN )
.then(() => {
    console.log("on!!!");
})

const app = Express();

app.use(Express.json());

app.use(express.static(path.join(__dirname, "/frontend/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build', 'index.html'));
});

app.listen(process.env.PORT || 8800, () => {
    console.log("server is on");
});

app.use("/api/pins", pinRoute); //whenever you need to call pinRoute or pin related requests simply call to /api/pins/"url from method"

