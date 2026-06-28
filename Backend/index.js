require("dotenv").config()
const express = require('express');
const app = express();
const cors = require('cors');
const {routes} = require('./Routes/authroutes');
const {connectDB} =  require('./config/db');
const productRoutes = require("./routes/productRoutes");

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", routes);
app.use("/products", productRoutes);
app.use("/uploads", express.static("uploads"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});