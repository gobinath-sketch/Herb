import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Home from "./Landing/Home";
import LearningSection from "./Learning/LearningSection";
import ExplorePlants from "./ExplorePlants/ExplorePlants";
import PlantDetails from "./ExplorePlants/PlantDetails";
import VirtualFarm from "./VirtualFarm/VirtualFarm";
import VRHerbarium from "./VirtualHerbarium/VRHerbarium";
import Navbar from "./Landing/Navbar";
import { motion, AnimatePresence } from "framer-motion";
import LoginPage from "./Auth/LoginPage";
import SignUpPage from "./Auth/SignUpPage";
import ForgotPasswordPage from "./Auth/ForgotPasswordPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "./components/ui/toaster";
import Identify from "./pages/Identify";
import PlantData from "./pages/PlantData";
import GoogleCallback from "./Auth/GoogleCallback";
import GithubCallback from "./Auth/GithubCallback";
import PlantCareGuide from "./pages/PlantCareGuide";
import PersonalizedCareTips from "./pages/PersonalizedCareTips";
import DiseaseDetection from './pages/DiseaseDetection';

function AppLayout() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/auth/google/callback" element={<GoogleCallback />} />
      <Route path="/auth/github/callback" element={<GithubCallback />} />
      
      {/* Protected routes with layout */}
      <Route element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
        <Route path="/" element={<Home />} />
        <Route path="/learning" element={<LearningSection />} />
        <Route path="/explore-plants" element={<ExplorePlants />} />
        <Route path="/explore-plants/:plantId" element={<PlantDetails />} />
        <Route path="/virtual-farm" element={<VirtualFarm />} />
        <Route path="/vr-herbarium" element={<VRHerbarium />} />
        <Route path="/identify" element={<Identify />} />
        <Route path="/plant/:plantsID" element={<PlantData />} />
        <Route path="/plant-care-guide" element={<PlantCareGuide />} />
        <Route path="/personalized-care-tips" element={<PersonalizedCareTips />} />
        <Route path="/disease-detection" element={<DiseaseDetection />} />
      </Route>
      
      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
