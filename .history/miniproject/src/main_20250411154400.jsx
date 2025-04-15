import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import ExplorePlants from './ExplorePlants/ExplorePlants.jsx'
import LandingModel from './Landing/LandingModel.jsx'
import ModelViewer from './Landing/ModelViewer.jsx'
import PlantDetails from './ExplorePlants/PlantDetails.jsx'
import ComingSoon from './ComingSoon.jsx'

// Check for Ethereum provider
if (typeof window.ethereum !== 'undefined') {
  console.log('Ethereum provider detected');
} else {
  console.log('No Ethereum provider found');
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
