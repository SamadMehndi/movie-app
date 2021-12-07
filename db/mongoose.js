//importing mongoose
const mongoose = require("mongoose");
const config = require("../config/default.json");

//Db connection
const DB = config.paths.dbPath;
mongoose.connect(DB, {
    useNewUrlParser: true, useUnifiedTopology: true,
})
    .then(() => console.log("Connected to the MongoDb.."))
    .catch(err => console.error("Could not connect to MongoDb..",err))

// exporting mongoose :-
module.exports = mongoose;