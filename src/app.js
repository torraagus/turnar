const express = require("express");
const cors = require("cors");
const app = express();

const { ensureToken, verifyToken } = require("./middlewares/jwt");

// settings
app.set("port", process.env.PORT || 4000);

// middleware - Se ejecutan antes de llegar a las urls
app.use(cors());
app.use(express.json());

// routes
app.use(
  "/api/users",
  ensureToken,
  verifyToken,
  require("./routes/users.routes")
);
app.use(
  "/api/vessels",
  // ensureToken,
  // verifyToken,
  require("./routes/vessels.routes")
);
app.use("/api/login", require("./routes/login.routes"));

module.exports = app;
