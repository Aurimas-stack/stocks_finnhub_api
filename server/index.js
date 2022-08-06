require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const dbUtil = require("./db-util");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api", (_, res) => {
  res.json({ message: "Hello from server!" });
});

app.post("/api/stock", async (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const stock = {
    "Company name": req.body.name,
    "Stock Price": req.body.price,
  };

  console.log(stock);

  let client;

  try {
    client = await dbUtil.connectDB(process.env.URL);
  } catch (error) {
    res.status(500).json({ message: "Connecting to DB failed" });
    return;
  }

  try {
    await dbUtil.insertDocument(client, "stocks", { stocks: stock });
    client.close();
  } catch (error) {
    res.status(500).json({ message: "Inserting data failed" });
    return;
  }

  res.status(201).json({ message: "Stocks have been sent!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
