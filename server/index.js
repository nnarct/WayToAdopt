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

const UserModel = require("./models/UserModel");
const UserService = require("./services/UserService");
const AuthenticationService = require("./services/AuthenticationService");
const PostService = require("./services/PostService");
const PostModel = require("./models/Postmodel");

const authenticationService = new AuthenticationService();
const userModel = new UserModel();
const postService = new PostService(authenticationService);
const userService = new UserService(userModel, authenticationService);
const userController = new UserController(userService, authenticationService);
const postController = new PostController(authenticationService, postService);

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:2545",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT || 3001;

const storage = multer.memoryStorage(); // set up in-memory storage for file upload
const upload = multer({ storage: storage }); // initialize multer for file upload

// Routes setup

app.post("/register", AuthController.createUser);

//User
app.post("/profile", userController.getUser);
app.post("/submitterinfo", userController.getSubmitterInfo);

//Post
app.get("/posts", postController.getAllActivePost);
app.post("/postDetails", PostController.getPostById);
app.post("/questions", PostController.getQuestions);
app.post("/send-answer", PostController.sendAnswer);
app.post("/myposts", PostController.getUserPosts);

app.post("/answer", PostController.getAnswer);
app.post("/all-answer-user-id", PostController.allAnswerUserIds);

app.post("/createpost", upload.single("file"), PostController.createNewPost);

app.delete("/post", PostController.deletePost);
app.put("/post", PostController.changePostStatus);

//PetType
app.get("/pettypes", PetTypeController.getPetTypes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
