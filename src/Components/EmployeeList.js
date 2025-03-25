import React, { useState, useEffect } from "react";
import axios from "axios";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    salary: "",
  });
  const [editing, setEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((response) => setEmployees(response.data))
      .catch((error) => console.error("Error fetching employees:", error));
  };

  const handleChange = (e) => {
    setNewEmployee({ ...newEmployee, [e.target.name]: e.target.value });
  };

  const handleAddEmployee = () => {
    if (!newEmployee.name || !newEmployee.email || !newEmployee.phone || !newEmployee.designation || !newEmployee.salary) {
      alert("All fields are required!");
      return;
    }

    axios
      .post("http://localhost:5000/api/employees", newEmployee)
      .then(() => {
        fetchEmployees();
        setNewEmployee({ name: "", email: "", phone: "", designation: "", salary: "" });
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        alert("Failed to add employee");
      });
  };

  const handleEditEmployee = (id) => {
    const employee = employees.find((emp) => emp._id === id);
    setNewEmployee(employee);
    setEditing(true);
  };

  const handleUpdateEmployee = () => {
    axios
      .put(`http://localhost:5000/api/employees/${newEmployee._id}`, newEmployee)
      .then((response) => {
        setEmployees(
          employees.map((emp) => (emp._id === response.data._id ? response.data : emp))
        );
        setNewEmployee({ name: "", email: "", phone: "", designation: "", salary: "" });
        alert("Employee updated successfully!"); // Success message
      })
      .catch((error) => {
        console.error("Error updating employee:", error.response?.data || error.message);
        alert(`Failed to update employee: ${error.response?.data?.error || "Server error"}`);
      });
  };
  

  const handleDeleteEmployee = (id) => {
    axios
      .delete(`http://localhost:5000/api/employees/${id}`)
      .then(() => {
        fetchEmployees();
      })
      .catch((error) => {
        console.error("Error deleting employee:", error);
        alert("Failed to delete employee");
      });
  };

  const filteredEmployees = employees.filter((employee) =>
    employee?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Employee List</h1>

      <input
        type="text"
        placeholder="Search employees..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mb-4">
        <input type="text" name="name" placeholder="Name" className="border p-2 mr-2" value={newEmployee.name} onChange={handleChange} />
        <input type="text" name="email" placeholder="Email" className="border p-2 mr-2" value={newEmployee.email} onChange={handleChange} />
        <input type="text" name="phone" placeholder="Phone" className="border p-2 mr-2" value={newEmployee.phone} onChange={handleChange} />
        <input type="text" name="designation" placeholder="Designation" className="border p-2 mr-2" value={newEmployee.designation} onChange={handleChange} />
        <input type="number" name="salary" placeholder="Salary" className="border p-2 mr-2" value={newEmployee.salary} onChange={handleChange} />
        {editing ? (
          <button className="bg-yellow-500 text-white p-2" onClick={handleUpdateEmployee}>Update Employee</button>
        ) : (
          <button className="bg-blue-500 text-white p-2" onClick={handleAddEmployee}>Add Employee</button>
        )}
      </div>

      <table className="table-auto w-full">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Phone</th>
            <th className="border p-2">Designation</th>
            <th className="border p-2">Salary</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredEmployees.map((emp) => (
            <tr key={emp._id}>
              <td className="border p-2">{emp.name}</td>
              <td className="border p-2">{emp.email}</td>
              <td className="border p-2">{emp.phone}</td>
              <td className="border p-2">{emp.designation}</td>
              <td className="border p-2">{emp.salary}</td>
              <td className="border p-2">
                <button className="bg-yellow-500 text-white p-2 mr-2" onClick={() => handleEditEmployee(emp._id)}>Edit</button>
                <button className="bg-red-500 text-white p-2" onClick={() => handleDeleteEmployee(emp._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
