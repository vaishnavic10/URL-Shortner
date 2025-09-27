const express = require("express");
const connectDB = require("./config/db"); 
const app = express();

connectDB();

app.use(express.json());

app.use("/", require("./routes/url"));

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
