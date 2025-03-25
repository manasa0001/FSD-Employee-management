import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EmployeeRegister = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
  });

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!employee.name || !employee.email || !employee.phone || !employee.designation || !employee.salary) {
      alert("All fields are required!");
      return;
    }

    axios
      .post("http://localhost:5000/api/employees", employee)
      .then((response) => {
        alert("Employee Registered Successfully!");
        navigate("/employee-list"); // Redirect to Employee List
      })
      .catch((error) => {
        console.error("Error registering employee:", error);
        alert("Failed to register employee");
      });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Register Employee</h2>
        <form onSubmit={handleRegister}>
          <input type="text" name="name" placeholder="Name" className="border p-2 w-full mb-2" value={employee.name} onChange={handleChange} />
          <input type="email" name="email" placeholder="Email" className="border p-2 w-full mb-2" value={employee.email} onChange={handleChange} />
          <input type="text" name="phone" placeholder="Phone" className="border p-2 w-full mb-2" value={employee.phone} onChange={handleChange} />
          <input type="text" name="designation" placeholder="Designation" className="border p-2 w-full mb-2" value={employee.designation} onChange={handleChange} />
          <input type="number" name="salary" placeholder="Salary" className="border p-2 w-full mb-2" value={employee.salary} onChange={handleChange} />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">Register</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeRegister;
