import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import router from "./src/routers/index.js";
import roomRouter from "./src/routers/room.router.js";
import orderRouter from './src/routers/order.router.js';

dotenv.config();

const app = express();

connectDB();

// Cấu hình CORS
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Server hoạt động!");
});

app.use("/", router);


app.use("/api/orders", orderRouter);

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
	console.log(`WSV eCommerce start with ${PORT}`)
})
