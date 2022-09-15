const userData = require("../model/user.model");
const productModal = require("../model/product.model");

exports.userRegistration = async (req, res) => {
    try {
        const userDetails = new userData({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            phone: req.body.phone,
            phoneCode: req.body.phoneCode,
            email: req.body.email,
            username: req.body.username,
            gender: req.body.gender,
            birthDate: req.body.birthDate,
            wallet: req.body.wallet,
            phoneVerify: 0,
            password: req.body.password,
            status: 0
        });

        console.log("user::", userDetails);

        const saveUserData = await userDetails.save();

        res.status(201).json(
            {
                message: "User Registered",
                status: 201,
                data: saveUserData
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

exports.userViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await userData.find({ _id: id });


        res.status(201).json({
            message: "View User By Id",
            status: 201,
            info: {
                id: data[0]._id,
                firstName: data[0].firstName,
                lastName: data[0].lastName,
                phone: data[0].phone,
                phoneCode: data[0].phoneCode,
                email: data[0].email,
                username: data[0].username,
                gender: data[0].gender,
                birthDate: data[0].birthDate,
                wallet: data[0].wallet,
                phoneVerify: data[0].phoneVerify,
                password: data[0].password,
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.userViewAll = async (req, res) => {
    try {
        const data = await userData.find().limit(10);

        res.status(201).json({
            message: "Get All User Data",
            status: 201,
            data: data
        })
    } catch (error) {
        console.log("All User:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.userUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        const data = await userData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phone: req.body.phone,
                    phoneCode: req.body.phoneCode,
                    email: req.body.email,
                    username: req.body.username,
                    birthDate: req.body.birthDate,
                    wallet: req.body.wallet,
                    phoneVerify: req.body.phoneVerify,
                    password: req.body.password
                }
            }
        )
            .then(() => {
                res.status(200).json({
                    message: "Update User Profile Successfully",
                    status: 200
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Something Went wrong",
                    status: 500
                })
            })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.userDeleteById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await userData.find({ id: id });
        const del = userData.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            res.status(201).json({
                message: "Delete User Data",
                status: 201,
                data: data
            });
        });
    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500,
        });
    }
};

exports.userCount = async (req, res) => {
    try {
        const getUser = await userData.find().count();
        res.status(201).json({
            message: "User in our system",
            status: 201,
            data: getUser
        })

    } catch (error) {
        console.log("error:", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.approvedUser = async (req, res) => {
    try {
        const approveData = await userData.find({ status: 1 })

        res.status(201).json(
            {
                message: "User Approved",
                status: 201,
                Total: approveData.length,
                data: approveData
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

exports.disApprovedUser = async (req, res) => {
    try {
        const approveData = await userData.find({ status: 0 })

        res.status(201).json(
            {
                message: "User Disapproved Approved",
                status: 201,
                Total: approveData.length,
                data: approveData
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


exports.userApprovedById = async (req, res) => {
    try {
        var id = req.params.id;
        const name = await userData.find({ _id: id });
        const userStatus = req.body.status;

        if (userStatus == undefined) {
            res.status(404).json({
                message: "Please Enter Value",
                status: 404
            })
        } else {

            const data = await userData.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {
                        status: userStatus
                    }
                }
            )
                .then(() => {
                    res.status(200).json({
                        message: "Update Store Approved Successfully",
                        status: 200,
                        info: {
                            firstName: name[0].firstName
                        }

                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Update Not Successfully",
                        status: 500
                    })
                })

        }

    } catch (error) {
        res.status(400).json({
            message: "Something Went Wrong",
            status: 400
        })
    }
};

exports.userDisapprovedById = async (req, res) => {
    try {
        var id = req.params.id;
        const name = await userData.find({ _id: id });
        const userStatus = req.body.status;

        if (userStatus == undefined) {
            res.status(404).json({
                message: "Please Enter Value",
                status: 404
            })
        } else {

            const data = await userData.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {
                        status: userStatus
                    }
                }
            )
                .then(() => {
                    res.status(200).json({
                        message: "Update Store Dispproved Successfully",
                        status: 200,
                        info: {
                            firstName: name[0].firstName
                        }
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Update Not Successfully",
                        status: 500
                    })
                })

        }

    } catch (error) {
        res.status(400).json({
            message: "Something Went Wrong",
            status: 400
        })
    }
};


exports.ininActivePhoneAndEmail = async (req, res) => {
    try {
        const approveData = await userData.find({ emailVerify: 0, phoneVerify: 0 })

        res.status(201).json(
            {
                message: "Product Approved",
                status: 201,
                Total: approveData.length,
                data: approveData
            }
        )
    } catch (error) {
        console.log("error:::", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
};

exports.inActivePhoneAndEmail = async (req, res) => {
    try {
        const approveData = await userData.find({ emailVerify: 1, phoneVerify: 1 })

        res.status(201).json(
            {
                message: "Product Approved",
                status: 201,
                Total: approveData.length,
                data: approveData
            }
        )
    } catch (error) {
        console.log("error:::", error);
        res.status(400).json(
            {
                message: "Something went wrong",
                status: 400
            }
        )
    }
};

exports.userPhoneVerifyUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        console.log("id::", id);
        const data = await userData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    phoneVerify: req.body.phoneVerify
                }
            }
        )
            .then(() => {
                res.status(200).json({
                    message: "Update User Phone Verify Successfully",
                    status: 200
                })
            })
            .catch((err) => {
                res.status(500).json({
                    message: "Something Went wrong",
                    status: 500
                })
            })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

