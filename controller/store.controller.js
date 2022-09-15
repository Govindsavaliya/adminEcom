const storeData = require("../model/store.model");
const productModel = require("../model/product.model");
const e = require("express");

exports.storeRegistration = async (req, res) => {
    try {
        const storeDetails = new storeData({
            storeName: req.body.storeName,
            password: req.body.password,
            phone: req.body.phone,
            phoneCode: req.body.phoneCode,
            email: req.body.email,
            address: req.body.address,
            emailVerify: req.body.emailVerify,
            phoneVerify: req.body.phoneVerify,
            state: req.body.state,
            city: req.body.city,
            status: 0,
        });

        console.log("user::", storeDetails);

        const saveStoreData = await storeDetails.save();

        res.status(201).json(
            {
                message: "Store Registered",
                status: 201,
                data: saveStoreData
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


exports.storeViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await storeData.find({ _id: id });


        res.status(201).json({
            message: "View Store By Id",
            status: 201,
            info: {
                id: data[0]._id,
                storeName: data[0].storeName,
                password: data[0].password,
                phone: data[0].phone,
                phoneCode: data[0].phoneCode,
                email: data[0].email,
                address: data[0].address,
                emailVerify: data[0].emailVerify,
                phoneVerify: data[0].phoneVerify,
                state: data[0].state,
                city: data[0].city,
                status: data[0].status,
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};

exports.storeViewAll = async (req, res) => {
    try {
        const data = await storeData.find();

        res.status(201).json({
            message: "Get All Store Data",
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

exports.storeUpdate = async (req, res) => {
    try {
        let id = req.params.id;
        console.log("id::", id);
        const data = await storeData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    storeName: req.body.storeName,
                    password: req.body.password,
                    phone: req.body.phone,
                    phoneCode: req.body.phoneCode,
                    email: req.body.email,
                    address: req.body.address,
                    emailVerify: 0,
                    phoneVerify: 0,
                    state: req.body.state,
                    city: req.body.city,
                    status: req.body.status
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

exports.storeDeleteById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await storeData.find({ id: id });
        const del = storeData.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            res.status(201).json({
                message: "Delete Store Data",
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

exports.storeCount = async (req, res) => {
    try {
        const getUser = await storeData.find().count();
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

exports.storeApproved = async (req, res) => {
    try {
        const approveData = await storeData.find({ status: 1 })

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

exports.disStoreApproved = async (req, res) => {
    try {
        const approveData = await storeData.find({ status: 0 })

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

exports.storeApprovedById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await storeData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    status: req.body.status
                }
            }
        ).then(async () => {

            const getProductData = await productModel.find({ store_id: id });
            console.log("getProductData::", getProductData);

            var success = [];

            for (const product of getProductData) {
                const updateProduct = await productModel.findByIdAndUpdate(
                    {
                        _id: product._id
                    },
                    {
                        status: 1
                    }
                ).then(() => {
                    success.push(true);
                    // res.status(200).json({
                    //     message: "Update Data",
                    //     status: 200
                    // })
                }).catch((err) => {
                    success.push(false);
                    // console.log("Error::", err);
                    // res.status(500).json({
                    //     message: "Something Went Wrong",
                    //     status: 500
                    // })
                })
            }

            if (success.some(x => x == true)) {
                res.status(200).json({
                    message: "Update Data",
                    status: 200
                })
            } else {
                res.status(500).json({
                    message: "Something Went Wrong",
                    status: 500
                })
            }

        })
            .catch((err) => {
                console.log("error--", err);
                res.status(500).json({
                    message: "Something Went Swrong",
                    status: 500
                })
            })
    } catch (error) {
        console.log("error:::::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.storeDisapprovedById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await storeData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    status: req.body.status
                }
            }
        ).then(async () => {

            const getProductData = await productModel.find({ store_id: id });
            console.log("getProductData::", getProductData);

            var success = [];

            for (const product of getProductData) {
                const updateProduct = await productModel.findByIdAndUpdate(
                    {
                        _id: product._id
                    },
                    {
                        status: 0
                    }
                ).then(() => {
                    success.push(true);
                    // res.status(200).json({
                    //     message: "Update Data",
                    //     status: 200
                    // })
                }).catch((err) => {
                    success.push(false);
                    // console.log("Error::", err);
                    // res.status(500).json({
                    //     message: "Something Went Wrong",
                    //     status: 500
                    // })
                })
            }
            if (success.some(x => x == true)) {
                res.status(200).json({
                    message: "Update Data",
                    status: 200
                })
            } else {
                res.status(500).json({
                    message: "Something Went Wrong",
                    status: 500
                })
            }

        })
            .catch((err) => {
                console.log("error", err);
                res.status(500).json({
                    message: "Something Went Swrong",
                    status: 500
                })
            })
    } catch (error) {
        console.log("error:::::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};


/* Store to Product Active And Inactive */

exports.storeApprovedProductById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await storeData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    status: req.body.status
                }
            }
        ).then(async () => {

            const getProductData = await productModel.find({ _id: id });
            console.log("getProductData::", getProductData);

            for (const product of getProductData) {
                const updateProduct = await productModel.findByIdAndUpdate(
                    {
                        _id: product._id
                    },
                    {
                        status: 1
                    }
                ).then(() => {
                    res.status(200).json({
                        message: "Update Data",
                        status: 200
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Something Went Wrong",
                        status: 500
                    })
                })
            }

        })
            .catch((err) => {
                console.log("error", err);
                res.status(500).json({
                    message: "Something Went Swrong",
                    status: 500
                })
            })
    } catch (error) {
        console.log("error:::::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};



exports.storeDisapprovedProductById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await storeData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    status: req.body.status
                }
            }
        ).then(async () => {

            const getProductData = await productModel.find({ _id: id });
            console.log("getProductData::", getProductData);

            for (const product of getProductData) {
                const updateProduct = await productModel.findByIdAndUpdate(
                    {
                        _id: product._id
                    },
                    {
                        status: 0
                    }
                ).then(() => {
                    res.status(200).json({
                        message: "Update Data",
                        status: 200
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Something Went Wrong",
                        status: 500
                    })
                })
            }

        })
            .catch((err) => {
                console.log("error", err);
                res.status(500).json({
                    message: "Something Went Swrong",
                    status: 500
                })
            })
    } catch (error) {
        console.log("error:::::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.storeApprovedByIdAndVerify = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await storeData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    emailVerify: req.body.emailVerify,
                    phoneVerify: req.body.phoneVerify,
                    status: req.body.status
                }
            }
        ).then(async () => {

            const getData = await storeData.find({ _id: id });
            console.log("getData::", getData);

            for (const product of getData) {
                const updateProduct = await storeData.findByIdAndUpdate(
                    {
                        _id: product._id
                    },
                    {
                        status: 1
                    }
                ).then(() => {
                    res.status(200).json({
                        message: "Update Data",
                        status: 200
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Something Went Wrong",
                        status: 500
                    })
                })
            }

        })
            .catch((err) => {
                console.log("error", err);
                res.status(500).json({
                    message: "Something Went Swrong",
                    status: 500
                })
            })
    } catch (error) {
        console.log("error:::::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};


exports.storeDisapprovedByIdAndVerify = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await storeData.findByIdAndUpdate(
            {
                _id: req.params.id
            },
            {
                $set: {
                    emailVerify: req.body.emailVerify,
                    phoneVerify: req.body.phoneVerify,
                    status: req.body.status
                }
            }
        ).then(async () => {

            const getData = await storeData.find({ _id: id });
            console.log("getData::", getData);

            for (const product of getData) {
                const updateProduct = await storeData.findByIdAndUpdate(
                    {
                        _id: product._id
                    },
                    {
                        status: 0
                    }
                ).then(() => {
                    res.status(200).json({
                        message: "Update Data",
                        status: 200
                    })
                }).catch((err) => {
                    res.status(500).json({
                        message: "Something Went Wrong",
                        status: 500
                    })
                })
            }

        })
            .catch((err) => {
                console.log("error", err);
                res.status(500).json({
                    message: "Something Went Swrong",
                    status: 500
                })
            })
    } catch (error) {
        console.log("error:::::", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.inActivePhoneAndEmail = async (req, res) => {
    try {
        const approveData = await storeData.find({ emailVerify: 0, phoneVerify: 0 })

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