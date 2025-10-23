import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ Connection Error:", err));

const userSchema = mongoose.Schema({ name: String });
const User = mongoose.model("User", userSchema);

const run = async () => {
  try {
    const u = new User({ name: "Hema Latha" });
    const saved = await u.save();
    console.log("✅ Inserted:", saved);
    mongoose.connection.close();
  } catch (err) {
    console.error("❌ Error inserting:", err);
  }
};

run();
