import express from "express";

import {
  createOfflineEnquiry,
  getOfflineEnquiries,
} from "../controller/offlineEnquiry.controller.js";

import { verifyAdmin } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", createOfflineEnquiry);

router.get("/", verifyAdmin, getOfflineEnquiries);

export default router;