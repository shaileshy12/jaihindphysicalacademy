import axios from "axios";

export const fetchGoogleSheetData = async () => {
  try {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;

    const RANGE = "Form Responses 1!A:F";

    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

    const response = await axios.get(url);

    const rows = response.data.values;

    if (!rows || rows.length <= 1) {
      return [];
    }

    const formattedData = rows.slice(1).map((row) => ({
      timestamp: row[0],
      fullName: row[1],
      phone: row[2],
      age: row[3],
      course: row[4],
      address: row[5],
    }));

    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};