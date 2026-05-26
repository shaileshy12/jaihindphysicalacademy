import { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { saveAs } from "file-saver";

const AdminAdmissions = () => {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    "https://jaihindphysicalacademy-production.up.railway.app/api/v1/admission";

  const fetchAdmissions = async () => {
    try {
      const response = await axios.get(API_URL);

      setAdmissions(response.data.admissions);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  // DELETE ADMISSION
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this admission?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/${id}`);

      setAdmissions((prev) =>
        prev.filter((item) => item._id !== id)
      );

      alert("Admission deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Failed to delete");
    }
  };

  // EXPORT CSV
  const exportCSV = () => {
    const worksheet = XLSX.utils.json_to_sheet(admissions);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Admissions"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "csv",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type: "text/csv;charset=utf-8;",
    });

    saveAs(data, "admissions.csv");
  };

  // EXPORT EXCEL
  const exportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(admissions);

    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Admissions"
    );

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(data, "admissions.xlsx");
  };

  // EXPORT PDF
  const exportPDF = () => {
    const doc = new jsPDF();

    const tableColumn = [
      "Name",
      "Phone",
      "Age",
      "Course",
      "Height",
      "Weight",
      "DOB",
      "Qualification",
      "Caste",
      "Address",
    ];

    const tableRows = admissions.map((item) => [
      item.fullName,
      item.phone,
      item.age,
      item.course,
      item.height,
      item.weight,
      item.dob,
      item.qualification,
      item.caste,
      item.address,
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
    });

    doc.save("admissions.pdf");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-4xl font-bold">
          Admissions Dashboard
        </h1>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={exportCSV}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
          >
            Export CSV
          </button>

          <button
            onClick={exportExcel}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Export Excel
          </button>

          <button
            onClick={exportPDF}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          >
            Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6">
        {admissions.map((item) => (
          <div
            key={item._id}
            className="bg-gray-100 border border-gray-300 rounded-xl p-5 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <p>
                <span className="font-bold">Name:</span>{" "}
                {item.fullName}
              </p>

              <p>
                <span className="font-bold">Phone:</span>{" "}
                {item.phone}
              </p>

              <p>
                <span className="font-bold">Age:</span>{" "}
                {item.age}
              </p>

              <p>
                <span className="font-bold">Course:</span>{" "}
                {item.course}
              </p>

              <p>
                <span className="font-bold">Height:</span>{" "}
                {item.height}
              </p>

              <p>
                <span className="font-bold">Weight:</span>{" "}
                {item.weight}
              </p>

              <p>
                <span className="font-bold">DOB:</span>{" "}
                {item.dob}
              </p>

              <p>
                <span className="font-bold">
                  Qualification:
                </span>{" "}
                {item.qualification}
              </p>

              <p>
                <span className="font-bold">Caste:</span>{" "}
                {item.caste}
              </p>

              <p>
                <span className="font-bold">Address:</span>{" "}
                {item.address}
              </p>
            </div>

            <button
              onClick={() => handleDelete(item._id)}
              className="mt-5 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              Delete Admission
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminAdmissions;