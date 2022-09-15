const router = require("express").Router();

const {
    userRegistration,
    userViewById,
    userViewAll,
    userUpdate,
    userDeleteById,
    userCount,
    approvedUser,
    disApprovedUser,
    userApprovedById,
    userDisapprovedById,
    ininActivePhoneAndEmail,
    userPhoneVerifyUpdate,
    inActivePhoneAndEmail,
}= require("../controller/user.controller");

router.post("/userRegistration", userRegistration);
router.get("/userViewById/:id", userViewById);
router.get("/userViewAll", userViewAll);
router.put("/userUpdate/:id", userUpdate);
router.delete("/userDeleteById/:id", userDeleteById);
router.get("/userCount", userCount); 
router.get("/approved", approvedUser);
router.get("/disApproved", disApprovedUser);
router.post("/userApprovedById/:id", userApprovedById);
router.post("/userDisapprovedById/:id", userDisapprovedById);
router.get("/ininActivePhoneAndEmail", ininActivePhoneAndEmail);
router.post("/userPhoneVerifyUpdate/:id", userPhoneVerifyUpdate);
router.get("/inActivePhoneAndEmail", inActivePhoneAndEmail);

module.exports = router;