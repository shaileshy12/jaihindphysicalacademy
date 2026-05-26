import { GoogleSpreadsheet } from "google-spreadsheet";

export const getGoogleFormData = async (req, res) => {
  try {

    const SHEET_ID = "1vgYoUebReiTzflnkQ9yA5WFEXQ6-jBS0kg-gRnDVCSc";

    const doc = new GoogleSpreadsheet(SHEET_ID);

    await doc.useApiKey(process.env.GOOGLE_API_KEY);

    await doc.loadInfo();

    const sheet = doc.sheetsByIndex[0];

    const rows = await sheet.getRows();

    const formatted = rows.map((row) => ({
      fullName: row.get("Full Name"),
      phone: row.get("Phone No."),
      age: row.get("Age"),
      course: row.get("Course"),
    }));

    res.status(200).json({
      success: true,
      data: formatted,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sheet data",
    });
  }
};