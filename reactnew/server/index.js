import { query } from "./db.js";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const port = 5000;

var jsonParser = bodyParser.json();

app.use(jsonParser);

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", async (req, res) => {
  try {
    const result = await query("SELECT * FROM todos");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  debugger;
  try {
    await query("INSERT INTO todos (item) VALUES ($1)", [req.body.item]);
    res.send("Updated successfully");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.delete("/", async (req, res) => {
  try {
    const result = await query("DELETE FROM todos WHERE id = $1", [
      req.body.id,
    ]);
    res.json(result.rowCount ? "Deleted successfully" : "No row found");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

app.put("/", async (req, res) => {
  try {
    const result = await query("UPDATE todos SET item = $2 WHERE id = $1", [
      req.body.id,
      req.body.item,
    ]);
    res.json(result.rowCount ? "Updated successfully" : "No row found");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//---------------

app.delete("/list", async (req, res) => {
  try {
    const sqlListFormat = req.body.idList.join(",");
    const sql = "DELETE FROM todos WHERE id in (" + sqlListFormat + ")";
    const result = await query(sql);
    res.json(result.rowCount ? "Deleted successfully" : "No row found");
  } catch (err) {
    console.error(err);
    res.send("Error " + err);
  }
});

//------------------

app.listen(port, () => {
  //server starts listening for any attempts from a client to connect at port: {port}
  console.log(`Now listening on port ${port}`);
});
