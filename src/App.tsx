import { useState } from "react";
import "./App.css";
import NearBySearch from "./pages/NearBySearch";
import Results from "./pages/Results";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<NearBySearch />} />
            <Route path="results" element={<Results />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
