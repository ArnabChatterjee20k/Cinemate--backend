import express from "express"
import bodyParser from "body-parser";
import authRouter from "./auth/routes";

const app = express()

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App running on PORT http://localhost:${PORT}`);
});