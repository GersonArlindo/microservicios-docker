const express = require("express");
const router = express.Router();
const data = require("../../data/data-library");

router.get("/", (req, res) => {
  const response = {
    service: "books",
    architecture: "monolithic",
    length: data.dataLibrary.books.length,
    data: data.dataLibrary.books,
  };
  return res.send(response);
});

router.get("/title/:title", (req, res) => {
  const titles = data.dataLibrary.books.filter((title) => {
    return title.title.includes(req.params.title);
  });
  const response = {
    service: "books",
    architecture: "monolithic",
    length: titles.length,
    data: titles,
  };
  return res.send(response);
});

module.exports = router;
