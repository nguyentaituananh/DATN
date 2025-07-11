// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config(); // nạp biến từ .env

const mongoURI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Đã kết nối MongoDB thành công");
  } catch (err) {
    console.error("❌ Lỗi khi kết nối MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;
