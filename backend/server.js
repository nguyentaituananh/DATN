import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";

// import productRoutes from "./src/routers/product.router.js";
// import authRoutes from "./src/routers/auth.router.js";
// import cartRoutes from "./src/routers/cart.router.js";
import router from "./src/routers/index.js";

dotenv.config();

const app = express();

// Kết nối MongoDB
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
// app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/auth", authRoutes);
// app.use("/cart", cartRoutes);

// Khởi động server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server chạy tại http://localhost:${PORT}`);
});
