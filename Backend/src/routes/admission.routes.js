import express from "express";
import {
  syncAdmissions,
  getAdmissions,
} from "../controller/admission.controller.js";

const router = express.Router();

router.get("/sync", syncAdmissions);
router.get("/", getAdmissions);

export default router;