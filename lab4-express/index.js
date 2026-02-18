const express = require("express");
const app = express();

app.use(express.static("public"));

const hits = { index: 0, page1: 0, page2: 0 };

app.get("/hits/:page", (req, res) => {
  const page = req.params.page;

  if (!(page in hits)) {
    return res.status(404).json({ error: "No such page" });
  }

  hits[page] += 1;
  res.json({ page, hits: hits[page] });
});


app.use((req, res) => {
  res.status(404).send("Invalid URL.");
});

app.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
});
