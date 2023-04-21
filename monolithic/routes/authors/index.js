const express = require("express");
const router = express.Router();
const data = require("../../data/data-library");

router.get("/", (req, res) => {
  const response = {
    service: "authors",
    data: data.dataLibrary.authors,
  };
  return res.send(response);
});

router.get("/:id", (req, res) => {
  const author = data.dataLibrary.authors.filter((author) => {
    return req.params.id == author.id;
  });
  const response = {
    service: "authors",
    architecture: "monolithic",
    data: author,
  };
  return res.send(response);
});

router.get("/author/:name", (req, res) => {
  const author = data.dataLibrary.authors.filter((author) => {
    return author.author.includes(req.params.name);
  });
  const response = {
    service: "authors",
    data: author,
  };
  return res.send(response);
});

module.exports = router;
