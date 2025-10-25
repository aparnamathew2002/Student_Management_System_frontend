import React, { useEffect, useState } from "react";
import { getAllStudentsAPI, updateStudentAPI } from "../management/allAPI";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function Teacher() {
  const [students, setStudents] = useState([]);

  // Fetch all students
  const fetchStudents = async () => {
    try {
      const data = await getAllStudentsAPI();
      const studentsWithDefaults = data.map((s) => ({
        ...s,
        marks: s.marks || "",
        attendance: s.attendance || "",
      }));
      setStudents(studentsWithDefaults);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch students", "error");
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input change for marks or attendance
  const handleChange = (id, field, value) => {
    setStudents((prev) =>
      prev.map((s) => ((s._id || s.id) === id ? { ...s, [field]: value } : s))
    );
  };

  // Handle update API call
  const handleUpdate = async (student) => {
    await updateStudentAPI(student._id || student.id, student);
    Swal.fire("Updated!", "Student record updated successfully", "success");
    fetchStudents();
  };

  // Handle delete marks/attendance (reset to empty)
  const handleDelete = async (student) => {
    const updated = { ...student, marks: "", attendance: "" };
    await updateStudentAPI(student._id || student.id, updated);
    Swal.fire("Deleted!", "Marks and Attendance cleared", "success");
    fetchStudents();
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Teacher Dashboard</h2>
        <Link to="/logins" className="btn btn-secondary">
          Back
        </Link>
      </div>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Roll No</th>
            <th>Course</th>
            <th>Marks</th>
            <th>Attendance</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s) => (
            <tr key={s._id || s.id}>
              <td>{s.name}</td>
              <td>{s.rollNo}</td>
              <td>{s.course}</td>
              <td>
                <input
                  type="number"
                  value={s.marks}
                  onChange={(e) => handleChange(s._id || s.id, "marks", e.target.value)}
                  className="form-control"
                  min="0"
                  max="100"
                  placeholder="Enter Marks"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={s.attendance}
                  onChange={(e) => handleChange(s._id || s.id, "attendance", e.target.value)}
                  className="form-control"
                  min="0"
                  max="100"
                  placeholder="Enter Attendance"
                />
              </td>
              <td>{s.teacher}</td>
              <td>
                <button className="btn btn-sm btn-success me-2" onClick={() => handleUpdate(s)}>
                  Update
                </button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(s)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Teacher;
