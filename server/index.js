require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const multer = require("multer");

const PostController = require("./controllers/postController");
const AuthController = require("./controllers/authController");
const UserController = require("./controllers/userController");
const PetTypeController = require("./controllers/petTypeController");
const verifyToken = require('./validators/verifyToken');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:2545"],
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;

const storage = multer.memoryStorage(); // set up in-memory storage for file upload
const upload = multer({ storage: storage }); // initialize multer for file upload

// Routes setup
app.get("/posts", PostController.getAllActivePost);

app.post("/register", AuthController.createUser);
app.get("/myposts", verifyToken,PostController.getUserPosts);
app.get("/profile",verifyToken, UserController.getUser);
app.post("/submitterinfo",verifyToken, UserController.getSubmitterInfo);

app.post("/postDetails", PostController.getPostById);
app.post("/questions", PostController.getQuestions);
app.post("/send-answer",verifyToken, PostController.sendAnswer);

app.post("/answer",verifyToken, PostController.getAnswer);
app.post("/all-answer-user-id",verifyToken, PostController.allAnswerUserIds);

app.post("/createpost",verifyToken, upload.single("file"), PostController.createNewPost);

app.get("/pettypes", PetTypeController.getPetTypes);
app.delete("/post", PostController.deletePost);
app.put("/post", PostController.changePostStatus);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
