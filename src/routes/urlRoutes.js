import { Router } from "express";
import { urlShortner, redirectOriginalUrl, getUrlStats, testConnection, deleteUrl, deleteUrlByShortCode } from "../controllers/urlShortner.js";

const router = Router();

router.route("/").post(urlShortner);
router.route("/admin/stats").get(getUrlStats);
router.route("/test").get(testConnection);
router.route("/delete/:id").delete(deleteUrl);
router.route("/delete/code/:shortcode").delete(deleteUrlByShortCode);
router.route("/:shortcode").get(redirectOriginalUrl);

export default router;