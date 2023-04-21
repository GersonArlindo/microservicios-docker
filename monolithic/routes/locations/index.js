const express = require("express");
const router = express.Router();
const data = require("../../data/data-library");

router.get("/", (req, res) => {
  const response = {
    service: "countries",
    architecture: "monolithic",
    length: data.dataLibrary.countries.length,
    data: data.dataLibrary.countries,
  };
  return res.send(response);
});
module.exports = router;
