const cors = require("cors");
const express = require("express");
const personalitiesData = require("./server.json");
const app = express();
app.use(cors());
app.use(express.json());
app.get("/all", function(req, res) {
   return res.json(personalitiesData)

}); 

app.listen(3000);