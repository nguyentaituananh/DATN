// db.js
import mongoose from "mongoose";
<<<<<<< HEAD
import dotenv from "dotenv";

dotenv.config();
=======
import dotenv from "dotenv" 
dotenv.config(); // nạp biến từ .env
>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840

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

<<<<<<< HEAD
export default connectDB;
=======
export default connectDB

>>>>>>> 55d107a72aa0df79e9a549e316f81d2abd82a840
