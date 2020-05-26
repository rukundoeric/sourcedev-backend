import express from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import session from "express-session";
import swaggerDoc from "../swagger.json";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(
  session({
    secret: process.env.SECRET,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  res.redirect("/docs");
});
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));
app.use((req, res) => {
  res.status(404).send({
    status: 404,
    error: {
      message: "Page Not found",
    },
  });
});

app.listen(port, () => {
  console.log(
    `Server listening on port: ${port} in ${process.env.NODE_ENV} mode`
  );
});
