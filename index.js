const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors =  require('cors');

const authRoute = require("./rootes/auth");
const userRoute = require("./rootes/Users");
const postRoute = require("./rootes/Posts");
const CategoriesRoute = require("./rootes/Categories");
const questinoRoute=require("./rootes/Question");
const multer = require("multer");
const UserModel = require("./models/User");
mongoose
  .connect("mongodb://0.0.0.0:27017/Blog")
  .then(console.log("connectd sunccesfu lly"))
  .catch((err) => console.log(err));
app.use(express.json());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },

  filename: (req, file, cb) => {
    let name = Date.now().toString() + file.originalname;
    req.body.filePath = name; 
    cb(null, name);
  },
});
const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
console.log('Image Uploading Started');
console.log(req.body.filePath);
return res.status(200).json("file uploaded succesfully");
})


app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", CategoriesRoute);
app.use("/api/question",CategoriesRoute);

app.listen("5000", () => {
  console.log("backend is running");
});
