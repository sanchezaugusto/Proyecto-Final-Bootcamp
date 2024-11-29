// import express from "express";
// import dbConnect from "./db/dbConnect";
// import dotenv from "dotenv";
// import router from "./routes/index";
// import cors from "cors";

// dotenv.config();

// const PORT = parseInt(process.env.PORT ?? "5000", 10);
// const HOST = process.env.HOST ?? "localhost";

// const app = express();

// app.use(cors({
//   origin: "http://localhost:3000", // Ajusta esto al origen de tu frontend
//   methods: ["GET", "POST", "PUT", "DELETE"],
// }));

// app.use(express.json());

// app.use("/api", router);

// dbConnect();

// app.listen(PORT, HOST, () => {
//   console.log(`Server is running on http://${HOST}:${PORT}`);
// });

import express from "express";
import dbConnect from "./db/dbConnect";
import dotenv from "dotenv";
import router from "./routes/index";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000", // Ajusta esto al origen de tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.use("/api", router);

dbConnect();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});