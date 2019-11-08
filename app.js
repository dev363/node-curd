import express from "express";
import bodyparser from "body-parser";
import cors from "cors";

import db from "./config/database";
import hb from "./config/handlebars"
import users from "./routes/users"


const app = express();

app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));

//Home route
app.get('/', (req, res) => {
    res.status(200).json({message:'Api is running'});
});

app.use("/users", users);

module.exports = app;
