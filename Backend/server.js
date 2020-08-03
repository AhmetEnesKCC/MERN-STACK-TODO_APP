const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const Todo = require("./todo.model");
const path = require("path");
require("dotenv").config();

const app = express();

const router = express.Router();

const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Database connection is succesfull, happy coding !");
});

app.use("/todos", router);

router.route("/").get((req, res) => {
  Todo.find((err, todos) => {
    if (err) {
      res
        .status(400)
        .send(
          "Can not connect to database due to some issues. Please try again later"
        );
    } else {
      res.json(todos);
    }
  });
});

router.route("/:id").get((req, res) => {
  let id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (err) {
      res.json(todo);
    } else {
      res.status(404);
    }
  });
});

router.route("/add").post((req, res) => {
  let todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.status(200).json({ todo: "todo added succesfull. Happy Coding" });
    })
    .catch((err) => {
      res.status(400).send("Sorry, could not add todo");
    });
});

router.route("/update/:id").put((req, res) => {
  Todo.findByIdAndUpdate(
    req.params.id,
    {
      todo: req.body.todo,
      importance: req.body.importance,
      completed: req.body.completed,
    },
    { new: true },
    () => {
      console.log("Updated Todo");
    }
  )
    .then(res.json({ updated: req.body.todo }))
    .catch((err) =>
      res.status(404).send("Could not update todo with id : " + req.params.id)
    );
});

router.route("/delete/:id").delete((req, res) => {
  Todo.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({ deleted: "todo  : " + req.body.todo });
    })
    .catch((err) => {
      res
        .status(404)
        .send("Could not find an existing todo with id : " + req.params.id);
    });
});

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

app.listen(process.env.PORT, () => {
  console.log("App started at port : " + PORT);
});
