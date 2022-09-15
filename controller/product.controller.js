const productData = require("../model/product.model");
const mongoose = require("mongoose");

exports.productRegistration = async (req, res) => {
    try {

        const storeId = req.body.store_id;

        const regularPrice = parseFloat(req.body.regular_price);
        const extraPrice = parseFloat(regularPrice) * 1.5 / 100;
        const totalPrice = regularPrice + extraPrice + 1;

        const productDetails = new productData({
            store_id: storeId,
            product_title: req.body.product_title,
            product_information: req.body.product_information,
            category: req.body.category,
            qty: req.body.qty,
            regular_price: regularPrice,
            extra_price: extraPrice,
            total_price: totalPrice,
            status: 0
        });



        const saveProductData = await productDetails.save();
        // const totalPrice = regularPrice +1.5%

        res.status(201).json(
            {
                message: "Product Registered",
                status: 201,
                data: saveProductData
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


exports.productViewById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await productData.find({ _id: id });


        res.status(201).json({
            message: "View Product By Id",
            status: 201,
            info: {
                id: data[0]._id,
                store_id: data[0].store_id,
                product_title: data[0].product_title,
                product_information: data[0].product_information,
                category: data[0].category,
                qty: data[0].qty,
                regular_price: data[0].regular_price,
                extra_price: data[0].extra_price,
                total_price: data[0].total_price,
                status: data[0].status
            }
        })

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        });
    }
};


exports.productViewAll = async (req, res) => {
    try {
        const data = await productData.find();

        res.status(201).json({
            message: "Get All Product Data",
            status: 201,
            data: data
        })
    } catch (error) {
        console.log("All Product:-", error);
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};

exports.productUpdate = async (req, res) => {
    try {
        let id = req.params.id;

        const productStatus = req.body.status;

        if (productStatus == undefined) {
            res.status(404).json({
                message: "Please Enter Value",
                status: 404
            })
        } else {
            const data = await productData.findByIdAndUpdate(
                {
                    _id: req.params.id
                },
                {
                    $set: {
                        store_id: req.body.store_id,
                        product_title: req.body.product_title,
                        product_information: req.body.product_information,
                        category: req.body.category,
                        qty: req.body.qty,
                        regular_price: req.body.regular_price,
                        // extra_price: req.body.extra_price,
                        // total_price: req.body.total_price,
                        status: req.body.status
                    }
                }
            )
                .then(() => {
                    res.status(200).json({
                        message: "Update Product Successfully",
                        status: 200
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        message: "Something Went wrong",
                        status: 500
                    })
                })
        }

    } catch (error) {
        res.status(500).json({
            message: "Something Went Wrong",
            status: 500
        })
    }
};


exports.productDeleteById = async (req, res) => {
    try {
        var id = req.params.id;
        const data = await productData.find({ id: id });
        const del = productData.findByIdAndDelete(id);
        del.exec(function (err, data) {
            if (err) throw err;
            res.status(201).json({
                message: "Delete Product Data",
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

exports.productCount = async (req, res) => {
    try {
        const getUser = await productData.find().count();
        res.status(201).json({
            message: "Product in our system",
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

exports.productActive = async (req, res) => {
    try {

        const productActiveData = await productData.find({ status: 1 })

        res.status(200).json({
            message: "Product Active",
            status: 200,
            Total: productActiveData.length,
            data: productActiveData
        })
    } catch (error) {
        console.log("error:::", error);
        res.status(400).json(
            {
                message: "Somthing Went Wrong",
                status: 400
            }
        )
    }
};