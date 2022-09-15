require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const cookieparser = require("cookie-parser");
require("./db/conn");

const Admin = require("./model/admin.model");
const Product = require("./model/product.model");
const Store = require("./model/store.model");
const User = require("./model/user.model");
const Country = require("./model/country.model");
const stateCity = require("./model/state&city.model");

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({extended: false}));

const port = process.env.PORT || 8000;

const adminRoutes = require("./routes/admin.routes");
const productRoutes = require("./routes/product.routes");
const storeRoutes = require("./routes/store.routes");
const userRoutes = require("./routes/user.routes");
const countryroutes = require("./routes/country.routes");
const stateCities = require("./routes/start&city.routes");
app.use("/admin", adminRoutes);
app.use("/product", productRoutes);
app.use("/store", storeRoutes);
app.use("/user", userRoutes);
app.use("/country",countryroutes)
app.use("/stateCities",stateCities)


app.listen(port,()=>{
    console.log(`Server Running At PORT : ${port}`);
})

