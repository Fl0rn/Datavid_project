import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./util/constants";
import { createEmployee, getAllEmployees } from "./routes/employees-routes";

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log("Server started on localhost:3000");
});

app.post("/addNewEmployee", createEmployee);
app.get("/getAllEmployees", getAllEmployees);

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (error: Error) => console.log(error));
