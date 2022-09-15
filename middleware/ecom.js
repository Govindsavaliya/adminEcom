const jwt = require("jsonwebtoken");
require("dotenv").config();
const chapter = require("../model/admin.model");

const adminSchema = async (req, res, next) => {
   try {
    const token = req.cookies.jwt;
    console.log("token:::", token);
    const verifyAdmin = jwt.verify(token, process.env.SECRET_KEY);
    const admin = await chapter.findOne({ _id: verifyAdmin._id });

    req.token = token;
    req.user = admin;
    next();
   } catch (error) {
    res.status(401).send('Not Match Data');
   }
}

module.exports = adminSchema;