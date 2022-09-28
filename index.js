require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.use(express.json());

//rotas

const bookRoutes = require("./routes/bookRoutes");

app.use("/book", bookRoutes);
//rota inicial

app.get("/", (req, res) => {
    res.status(200).json({ message: "BookAPI" });
});

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;

mongoose
    .connect(
        `mongodb+srv://${DB_USER}:${DB_PASSWORD}@api.9dby3ar.mongodb.net/DB?retryWrites=true&w=majority`
    )
    .then(() => {
        console.log("DB conectado");
        app.listen(2800);
    })
    .catch((error) => console.log(error));
