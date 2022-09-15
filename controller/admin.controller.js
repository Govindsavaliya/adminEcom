const jwt = require("jsonwebtoken");
const adminData = require("../model/admin.model");

exports.adminRegistration = async (req, res) => {
    try {
        const userDetails = new adminData({
            email: req.body.email,
            password: req.body.password
        });

        console.log("userDetails:::", userDetails);

        const saveUSerData = await userDetails.save();

        res.status(201).json(
            {
                message: "User Registered",
                status: 201,
                data: saveUSerData
            }
        )
    } catch (error) {
        console.log("error:", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
};

exports.adminLogin = async (req, res) => {
    try {
        
        const email = req.body.email;
        const pass = req.body.password;

        const data = await adminData.findOne({ email: email });

        const token = await data.generateauthtoken();
        console.log("token:::", token);
        res.cookie("jwt", token, {
            expires: new Date(Date.now() + 30 * 24 * 3600 * 10000),
            httpOnly: true,
        })

        if (!data) {
            res.status(404).json(
                {
                    message: "Data Not Exists.",
                    status: 404
                }
            )
        } else {
            if(pass == data.password) {
                res.status(200).json({
                    message: "Login Successfully",
                    staus: 200,
                    data: data.id,
                    token: token
                })
            } else {
                res.status(401).json({
                    message: "password incorrect",
                    status: 401
                })
            }
        }
    } catch (error) {
        console.log("error:::::::::", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
};

exports.adminLogout = async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((curelement)=>{
            return curelement.token !== req.token;
        })
        res.clearCookie("jwt");
        await req.user.save();
        res.status(201).json({
            message: "Logout Successfully",
            status: 201
        })
    } catch (error) {
        res.status(201).json({
            message: "Please Try Again..",
            status: 401,
            
        });
    }
}