import Admission from "../model/admission.model.js";
import { fetchSheetData } from "../services/googleSheets.service.js";

export const syncAdmissions = async (req, res) => {
  try {
    const rows = await fetchSheetData();

    if (!rows || rows.length < 2) {
      return res.status(400).json({
        success: false,
        message: "No data found",
      });
    }

    const dataRows = rows.slice(1);

    for (const row of dataRows) {
      const [fullName, phone, age, course] = row;

      const exists = await Admission.findOne({ phone });

      if (!exists) {
        await Admission.create({
          fullName,
          phone,
          age,
          course,
        });
      }
    }

    res.status(200).json({
      success: true,
      message: "Admissions synced successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to sync admissions",
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
      message: "Failed to fetch admissions",
    });
  }
};