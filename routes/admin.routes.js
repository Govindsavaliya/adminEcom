const router = require("express").Router();
const admin = require("../middleware/ecom");

const{
    adminRegistration,
    adminLogin,
    adminLogout,
}= require("../controller/admin.controller");

router.post("/adminRegistration", adminRegistration);
router.post("/adminLogin", adminLogin);
router.get("/adminLogout", admin, adminLogout); 

module.exports = router;   
