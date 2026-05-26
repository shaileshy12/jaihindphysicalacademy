import axios from "axios";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_API_KEY;

export const fetchSheetData = async () => {
  const range = "Form Responses 1!A:D";

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${range}?key=${API_KEY}`;

  const response = await axios.get(url);

  return response.data.values;
};