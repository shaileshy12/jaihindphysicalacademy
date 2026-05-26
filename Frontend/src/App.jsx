// src/App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./helper/Header";
import Footer from "./helper/Footer";
import EnquiryModal from "./helper/EnquiryModel";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/AboutUs/AboutUs";
import Enquiry from "./pages/Enquiry/Enquiry";
import ContactUs from "./pages/ContactUs/ContactUs";
import Courses from "./pages/Courses/Courses";
import Gallery from "./pages/Gallery/Gallery";

import Mission from "./pages/AboutUs/helper/Mission";
import Vision from "./pages/AboutUs/helper/Vision";
import DirectorDesk from "./pages/AboutUs/helper/DirectorDesk";

import SuccessStudents from "./pages/Success Students/Success_Students";

// ================= ADMIN =================

import AdminLogin from "./pages/Admin/AdminLogin.jsx";
import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
import AdminEnquiries from "./pages/Admin/AdminEnquiries.jsx";
import AdminUsers from "./pages/Admin/AdminUsers.jsx";
import AdminSettings from "./pages/Admin/AdminSettings.jsx";
import AdminGallery from "./pages/Admin/AdminGallery.jsx";
import AdminAdmissions from "./pages/Admin/AdminAdmissions.jsx";

import AdminLayout from "./components/AdminLayout.jsx";
import AdminProtectedRoute from "./components/AdminProtectedRoute.jsx";

// ================= I18N =================

import "./i18next/i18next";

function App() {
  const isAdminPage = window.location.pathname.startsWith("/admin");

  return (
    <div className="w-full flex flex-col min-h-screen justify-between">
      {/* Hide enquiry modal on admin pages */}

      {!isAdminPage && window.location.pathname !== "/admin/login" && (
        <EnquiryModal />
      )}

      {/* Hide header/footer on admin pages */}

      {!isAdminPage && <Header />}

      <main className="flex-1">
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}

          <Route path="/" element={<Home />} />
          <Route path="/en/" element={<Home />} />
          <Route path="/hi/" element={<Home />} />
          <Route path="/mr/" element={<Home />} />

          {/* ABOUT */}

          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/en/aboutus" element={<AboutUs />} />
          <Route path="/hi/aboutus" element={<AboutUs />} />
          <Route path="/mr/aboutus" element={<AboutUs />} />

          {/* DIRECTOR DESK */}

          <Route path="/director-desk" element={<DirectorDesk />} />
          <Route path="/en/director-desk" element={<DirectorDesk />} />
          <Route path="/hi/director-desk" element={<DirectorDesk />} />
          <Route path="/mr/director-desk" element={<DirectorDesk />} />

          {/* MISSION */}

          <Route path="/mission" element={<Mission />} />
          <Route path="/en/mission" element={<Mission />} />
          <Route path="/hi/mission" element={<Mission />} />
          <Route path="/mr/mission" element={<Mission />} />

          {/* VISION */}

          <Route path="/vision" element={<Vision />} />
          <Route path="/en/vision" element={<Vision />} />
          <Route path="/hi/vision" element={<Vision />} />
          <Route path="/mr/vision" element={<Vision />} />

          {/* ENQUIRY */}

          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/en/enquiry" element={<Enquiry />} />
          <Route path="/hi/enquiry" element={<Enquiry />} />
          <Route path="/mr/enquiry" element={<Enquiry />} />

          {/* CONTACT */}

          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/en/contactus" element={<ContactUs />} />
          <Route path="/hi/contactus" element={<ContactUs />} />
          <Route path="/mr/contactus" element={<ContactUs />} />

          {/* COURSES */}

          <Route path="/courses" element={<Courses />} />
          <Route path="/en/courses" element={<Courses />} />
          <Route path="/hi/courses" element={<Courses />} />
          <Route path="/mr/courses" element={<Courses />} />

          {/* SUCCESS STUDENTS */}

          <Route path="/success-students" element={<SuccessStudents />} />
          <Route path="/en/success-students" element={<SuccessStudents />} />
          <Route path="/hi/success-students" element={<SuccessStudents />} />
          <Route path="/mr/success-students" element={<SuccessStudents />} />

          {/* GALLERY */}

          <Route path="/gallery" element={<Gallery />} />
          <Route path="/en/gallery" element={<Gallery />} />
          <Route path="/hi/gallery" element={<Gallery />} />
          <Route path="/mr/gallery" element={<Gallery />} />

          {/* ================= ADMIN ROUTES ================= */}

          {/* PUBLIC LOGIN ROUTE */}

          <Route path="/admin/login" element={<AdminLogin />} />

          {/* PROTECTED ADMIN ROUTES */}

          <Route element={<AdminProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              {/* DEFAULT */}

              <Route index element={<AdminDashboard />} />

              {/* DASHBOARD */}

              <Route path="dashboard" element={<AdminDashboard />} />

              {/* AdminAdmission */}

              <Route path="/admin/admissions" element={<AdminAdmissions />} />

              {/* ENQUIRIES */}

              <Route path="enquiries" element={<AdminEnquiries />} />

              {/* USERS */}

              <Route path="users" element={<AdminUsers />} />

              {/* SETTINGS */}

              <Route path="settings" element={<AdminSettings />} />

              {/* GALLERY */}

              <Route path="gallery" element={<AdminGallery />} />
            </Route>
          </Route>
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
}

export default App;
