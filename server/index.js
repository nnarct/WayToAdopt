require('dotenv').config()
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const PostController = require("./controllers/postController");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:2545"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;

// Routes setup
// app.post('/user-profile', UserController.getUserProfile);
app.get("/posts", PostController.retrieveAllPost);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
