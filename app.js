const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const userRouter = require("./router/userRouter");
const productRouter = require("./router/productRouter");
const cartRouter = require("./router/cartRouter");
const uploadRouter = require("./router/uploadRouter"); // <– add your upload router

const authMiddleware = require("./middleware/auth");

const DB_url = "mongodb+srv://root:root@restart.vxqtwkt.mongodb.net/";

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔥 Serve static files from uploads folder
app.use("/uploads", express.static("uploads"));

// Routers
app.use("/api/amazon", userRouter);
app.use("/api/amazon", productRouter);
app.use("/api/amazon", uploadRouter); // <– mount the upload route
app.use("/api/amazon", cartRouter);

const port = 3007;

mongoose
  .connect(DB_url)
  .then(() => {
    console.log("Mongoose connected");
    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
