import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./app/database/postgresql.database";
import routes from "./app/routes/App.routes";
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())
app.use("/api", routes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});
