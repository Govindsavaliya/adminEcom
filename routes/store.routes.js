const router = require("express").Router();

const{
    storeRegistration,
    storeViewById,
    storeViewAll,
    storeUpdate,
    storeDeleteById,
    storeCount,
    storeApproved,
    disStoreApproved,
    storeApprovedById,
    storeDisapprovedById,
    storeApprovedProductById,
    storeDisapprovedProductById,
    storeApprovedByIdAndVerify,
    storeDisapprovedByIdAndVerify,
    inActivePhoneAndEmail,
}=require("../controller/store.controller");

router.post("/storeRegistration", storeRegistration);
router.get("/storeViewById/:id", storeViewById);
router.get("/storeViewAll", storeViewAll);
router.put("/storeUpdate/:id", storeUpdate);
router.delete("/storeDeleteById/:id", storeDeleteById);
router.get("/storeCount", storeCount); 
router.get("/approved", storeApproved);
router.get("/disApproved", disStoreApproved);
router.post("/storeApprovedById/:id", storeApprovedById);
router.post("/storeDisapprovedById/:id", storeDisapprovedById);
router.post("/storeApprovedProductById/:id", storeApprovedProductById);
router.post("/storeDisapprovedProductById/:id", storeDisapprovedProductById);
router.post("/storeApprovedByIdAndVerify/:id", storeApprovedByIdAndVerify);
router.post("/storeDisapprovedByIdAndVerify/:id", storeDisapprovedByIdAndVerify);
router.get("/inActivePhoneAndEmail", inActivePhoneAndEmail);





module.exports = router;   