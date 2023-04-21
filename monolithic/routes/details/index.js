const express = require("express");
const router = express.Router();
const data = require("../../data/data-library");

router.get("/", (req, res) => {
  const response = {
    service: "details",
    architecture: "monolithic",
    data: data.dataLibrary,
  };
  return res.send(response);
});
module.exports = router;
