import 'dotenv/config'
import express from "express";

const app = express();
const port = process.env.PORT || 2000;
app.use(express.json());

let myDatas = [];
let myId = 1;
// To post something from server
app.post("/gets", (req, res) => {
  const { name, price, quantity } = req.body;
  const newData = { id: myId++, name, price, quantity };
  myDatas.push(newData);
  res.status(201).send(newData);
});

// To get thwe posted order
app.get("/gets", (req, res) => {
  res.status(200).send(myDatas);
});

// To get an order with a particular Id
app.get("/gets/:id", (req, res) => {
  const order = myDatas.find((t) => t.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).send("Order Not Found");
  }
  res.status(200).send(order);
});

// To Update Order with given Id
app.put("/gets/:id", (req, res) => {
    const order = myDatas.find((t) => t.id === parseInt(req.params.id));
    if (!order) {
        return res.status(404).send("Order Not Found");
    }

    const { name, price, quantity } = req.body
    order.name = name
    order.price = price
    order.quantity = quantity
    res.status(202).send(order);
})

// To Delete an Order with given Index
app.delete("gets/:id", (req, res) => {
    const index = myDatas.findIndex((t) => t.id === parseInt(req.params.id))

    if (index === -1) {
        return res.status(404).send("Order Not Found");
    }

    myDatas.splice(index, 1)
    res.status(203).send("Deleted");
})

app.listen(port, () => {
  console.log(`Server is running at port: ${port}...`);
});

// Nodemon is Installed to restart the whole code whenever it modified
