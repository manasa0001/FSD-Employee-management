import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EmployeeRegister from "./Components/EmployeeRegister";
import EmployeeList from "./Components/EmployeeList";

const App = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Employee Management System</h1>
        <Routes>
          <Route path="/" element={<EmployeeRegister />} />
          <Route path="/employee-list" element={<EmployeeList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
