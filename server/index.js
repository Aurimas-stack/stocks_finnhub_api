const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.get("/api", (_, res) => {
    res.json({ message: "Hello from server!" });
});

app.post("/api/stock", (req, res) => {
  if(!req.body) return res.sendStatus(400);

  console.log({
    "Company name": req.body.name,
    "Stock Price": req.body.price
  });
});
  
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });