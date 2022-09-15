const router = require("express").Router();

const {
    productRegistration,
    productViewById,
    productViewAll,
    productUpdate,
    productDeleteById,
    productCount,
    productActive,
} = require("../controller/product.controller");

router.post("/productRegistration", productRegistration);
router.get("/productViewById/:id", productViewById);
router.get("/productViewAll", productViewAll);
router.put("/productUpdate/:id", productUpdate);
router.delete("/productDeleteById/:id", productDeleteById);
router.get("/productCount", productCount); 
router.get("/productActive", productActive); 

module.exports = router;   