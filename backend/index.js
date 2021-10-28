const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const authRoute = require("./routes/authRoute");
const noteRoute = require("./routes/noteRoute");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const path = require("path");

const app = express();
dotenv.config();
connectDatabase();

//middlewares
app.use(cors());
app.use(express.json());
//routes
app.use("/api/auth", authRoute);
app.use("/api/notes", noteRoute);

// --------------------------deployment------------------------------
const dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirname, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

//Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
  console.log(
    `server running in ${process.env.NODE_ENV}  ${process.env.PORT || 8000}`
  );
});
