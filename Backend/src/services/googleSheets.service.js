import axios from "axios";

export const fetchGoogleSheetData = async () => {
  try {
    const SHEET_ID = process.env.GOOGLE_SHEET_ID;
    const API_KEY = process.env.GOOGLE_API_KEY;

    const RANGE = "const RANGE = Form Responses 1!A:K";

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
  height: row[5],
  weight: row[6],
  dob: row[7],
  qualification: row[8],
  caste: row[9],
  address: row[10],
}));

    return formattedData;
  } catch (error) {
    console.log(error);
    return [];
  }
};