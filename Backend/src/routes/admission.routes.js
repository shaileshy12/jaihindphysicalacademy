import express from "express";
import {
  syncAdmissions,
  getAdmissions,
  clearAdmissions,
} from "../controllers/admission.controller.js";

const router = express.Router();

router.get("/sync", syncAdmissions);

router.get("/", getAdmissions);

router.delete("/clear", clearAdmissions);

export default router;