import { app } from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./db/index.js";

dotenv.config();

console.log("Starting server...");
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI:", process.env.MONGO_URI ? "Set" : "Not set");

connectDB()
.then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT || 8000, () => {
        console.log(`✅ Server running on port ${process.env.PORT || 8000}`);
        console.log(`🔗 API available at: http://localhost:${process.env.PORT || 8000}/v1/api/url/`);
        console.log(`📊 Test endpoint: http://localhost:${process.env.PORT || 8000}/v1/api/url/test`);
        console.log(`📈 Stats endpoint: http://localhost:${process.env.PORT || 8000}/v1/api/url/admin/stats`);
    });
})
.catch((err) => {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
});