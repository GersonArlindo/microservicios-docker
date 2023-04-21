const express = require("express");
const data = require("../data/data-library");
const authors = require("../routes/authors");
const books = require("../routes/books");
const countries = require("../routes/locations");
const details = require("../routes/details");

const app = express();

app.use("/api/v1/authors", authors);
app.use("/api/v1/books", books);
app.use("/api/v1/countries", countries);
app.use("/api/v1/details", details);

module.exports = app;
