const express = require("express");
const { MongoClient } = require("mongodb");
const cors = require("cors");

require("dotenv").config();
const app = express();

const port = process.env.port || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.x1c7x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("carMmechanic");
    const servicesCollection = database.collection("services");
    //port API
    app.post("/services", async (req, res) => {
      const service = req.body;
      console.log("hit the api", service);

      const result = await servicesCollection.insertOne("service");
      console.log(result);
      res.json(result);
    });
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Genius Car");
});

app.listen(port, () => {
  console.log("running", port);
});
