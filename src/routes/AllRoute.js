const Router = require("express")
const request = require("../controllers/request")
const upload = require("../middleware/upload")
const content = require("../controllers/content")
const router = new Router()

router.post("/request", request.getRequest)
router.get("/requests", request.getAllReq)
router.post("/signin", request.signIn)
router.post("/requests/delete", request.deleteRequest)
router.post("/requests/isAnswered", request.isAnsweredRequest)
router.post("/content/mainCard", upload.single("image"), content.CreateMainCard)
router.get("/content/mainCard", content.getAllMainCards)
router.post("/content/mainCard/delete", content.deleteMainCard)
router.post("/content/mainCard/edit", upload.single("image"), content.editMainCard)
router.post("/content/detailCard/delete", content.deleteDetailCard)
router.post("/content/detailCard", upload.single("image"), content.addDetailCard)

module.exports = router