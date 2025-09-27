const express = require("express");
const mongoose = require("mongoose");
const urlRoutes = require("./routes/url");

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://vaishnavichopade2004:vaivi1977@cluster0.ybffv.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use("/api/url", urlRoutes);

// Server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
