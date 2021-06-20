const db = require("./db/models");
const express = require("express");
const app = express();
const eventRouters = require("./routers/events");
db.sequelize.sync({ alter: true });
app.use(express.json());
app.use("/events", eventRouters);
app.listen(8000);
