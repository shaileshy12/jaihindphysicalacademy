import Admission from "../model/admission.model.js";
import axios from "axios";
import { fetchGoogleSheetData } from "../services/googleSheets.service.js";

export const syncAdmissions = async (req, res) => {
  try {
    const rows = await fetchGoogleSheetData();

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No data found",
      });
    }

    for (const row of rows) {
      const exists = await Admission.findOne({
        phone: row.phone,
        timestamp: row.timestamp,
    });

      if (!exists) {
        await Admission.create(row);
      }
    }

    res.status(200).json({
      success: true,
      message: "Admissions synced successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAdmissions = async (req, res) => {
  try {
    const admissions = await Admission.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      admissions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const clearAdmissions = async (req, res) => {
  try {
    await Admission.deleteMany({});

    res.status(200).json({
      success: true,
      message: "All admissions deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteAdmission = async (req, res) => {
  try {
    const admission = await Admission.findById(req.params.id);

    if (!admission) {
      return res.status(404).json({
        success: false,
        message: "Admission not found",
      });
    }

    // DELETE FROM GOOGLE SHEET
    await axios.post(process.env.GOOGLE_SCRIPT_URL, {
      phone: admission.phone,
      timestamp: admission.timestamp,
    });

    // DELETE FROM MONGODB
    await Admission.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Admission deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};