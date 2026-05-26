import express from "express";
import {
  syncAdmissions,
  getAdmissions,
  clearAdmissions,
  deleteAdmission,
} from "../controllers/admission.controller.js";

const router = express.Router();

router.get("/sync", syncAdmissions);

router.get("/", getAdmissions);

router.delete("/clear", clearAdmissions);

router.delete("/:id", deleteAdmission);

export default router;