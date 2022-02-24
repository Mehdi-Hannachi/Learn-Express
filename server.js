require("dotenv").config({ path: "./config/.env" });

const express = require("express");
const connectDB = require("./config/connectDB");
const auth = require("./routes/auth");

//Create local middleware
const logger = (req, res, next) => {
  // if true ===> next
  // if false ===> blocked
  true ? next() : res.send("Blocked");
};

const app = express();

//4- Parse data
app.use(express.json());

// 2 - Connect data base
connectDB();

//Apply logger middleware
app.use(logger);

// Fake Data =
let phones = [
  {
    id: 1,
    marque: "Apple",
    model: "Iphone 7 ",
  },
  {
    id: 2,
    Marque: "Apple",
    Model: "Iphone 12 pro Max ",
  },
  {
    id: 3,
    Marque: "Sumsung",
    Model: " S22 Ultra ",
  },
];

// 3- Create endpoints (routes)

// GET all phones
// GET  "/phones"
// @desc  : get all phones

app.get("/phones", (req, res) => {
  try {
    res.status(201).json({ phones: phones });
  } catch (error) {
    res.status(401).json({ errors: error });
  }
});

//Add new phone
//POST "/phones"
//@desc : Add new phone

app.post("/phones", isAuth(), (req, res) => {
  console.log("1", req.body);
  try {
    let newPhone = { ...req.body, id: Math.random() };

    console.log("2", newPhone);

    phones.push(newPhone);
    res.status(201).json({ msg: "Phone added with success", phones });
  } catch (error) {
    res.status(401).json({ msg: "Adding phone failed", errors: error });
  }
});

// Update a phone
// PUT "/phones/:id"
// @desc : Update a phone

app.put("/phones/:id", (req, res) => {
  try {
    // let id = +req.params.id;
    let id = Number(req.params.id);
    phones = phones.map((phone) =>
      phone.id === id ? { ...phone, ...req.body } : phone
    );
    console.log("2", phones);
    res.status(201).json({ msg: "Phone updated with success", phones });
  } catch (error) {
    res
      .status(401)
      .json({ msg: "Phone didin't update", phones, errors: error });
  }
});

// Delete phone
// DELETE '/phones/:id
// @desc delete phone

app.delete("/phones/:id", (req, res) => {
  try {
    let id = +req.params.id;
    phones = phones.filter((phone) => phone.id !== id);
    res.status(201).json({ msg: " Phone deleted successfully", phones });
  } catch (error) {
    res
      .status(401)
      .json({ msg: " Phone didn't delete", phones, errors: error });
  }
});

app.use("/user", auth);

//  1 - Run server
app.listen(process.env.PORT, (err) => {
  err
    ? console.log("Server connection failed", err)
    : console.log(
        `The server is running on http://localhost:${process.env.PORT}`
      );
});
