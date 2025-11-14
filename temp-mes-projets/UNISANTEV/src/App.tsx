"use client";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/PageDOCTEUR_Et_PRINCIPAL/LoginPage";
import DoctorPage from "./pages/PageDOCTEUR_Et_PRINCIPAL/DoctorPage";
import Inscription from "./pages/PageDOCTEUR_Et_PRINCIPAL/inscription";
import ForgotPassword from "./pages/PageDOCTEUR_Et_PRINCIPAL/ForgotPassword";
import PageAdmin from "./pages/PageAdministration/PageAdmin";
import Patient from "./pages/PagePatient/Patient";
import { FournisseurRendezVous } from "./components/SousPageDocteur/AppointmentContext";

const App: React.FC = () => {
  return (
    <Router>
      <FournisseurRendezVous>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/admin" element={<PageAdmin />} />
          <Route path="/doctor" element={<DoctorPage />} />
          <Route path="/signup" element={<Inscription />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/patient" element={<Patient />} />
          <Route path="/PageDOCTEUR_Et_PRINCIPAL/LoginPage" element={<LoginPage />} />
        </Routes>
      </FournisseurRendezVous>
    </Router>
  );
};

export default App;