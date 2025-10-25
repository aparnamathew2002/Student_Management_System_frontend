import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import Swal from "sweetalert2";
import {addStudentAPI,updateStudentAPI,getAllStudentsAPI,addTeacherAPI,updateTeacherAPI,getAllTeachersAPI,deleteStudentAPI,deleteTeacherAPI} from "../management/allAPI";

const steps = ["Add Student Details", "Add Teacher Details", "View All Records"];

function Admin() {
  const [activeStep, setActiveStep] = useState(0);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [studentInput, setStudentInput] = useState({
    name: "",
    rollNo: "",
    course: "",
    teacher: "",
  });

  const [teacherInput, setTeacherInput] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);
  const [editType, setEditType] = useState(null);

  // Fetch data on load
  useEffect(() => {
    fetchAllStudents();
    fetchAllTeachers();
  }, []);

  const fetchAllStudents = async () => {
    try {
      const data = await getAllStudentsAPI();
      setStudents(data || []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch students", "error");
    }
  };

  const fetchAllTeachers = async () => {
    try {
      const data = await getAllTeachersAPI();
      setTeachers(data || []);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to fetch teachers", "error");
    }
  };

  // Add / Update Student
  const handleAddStudent = async () => {
    const { name, rollNo, course, teacher } = studentInput;
    if (!name || !rollNo || !course || !teacher) {
      Swal.fire("Error", "Please fill all student details", "error");
      return;
    }

    try {
      if (editId && editType === "student") {
        await updateStudentAPI(editId, studentInput);
        Swal.fire("Updated!", "Student updated successfully", "success");
      } else {
        await addStudentAPI(studentInput);
        Swal.fire("Added!", "Student added successfully", "success");
      }

      setStudentInput({ name: "", rollNo: "", course: "", teacher: "" });
      setEditId(null);
      setEditType(null);
      fetchAllStudents();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add/update student", "error");
    }
  };

  // Add / Update Teacher
  const handleAddTeacher = async () => {
    const { name, subject, email, phone } = teacherInput;
    if (!name || !subject || !email || !phone) {
      Swal.fire("Error", "Please fill all teacher details", "error");
      return;
    }

    try {
      if (editId && editType === "teacher") {
        await updateTeacherAPI(editId, teacherInput);
        Swal.fire("Updated!", "Teacher updated successfully", "success");
      } else {
        await addTeacherAPI(teacherInput);
        Swal.fire("Added!", "Teacher added successfully", "success");
      }

      setTeacherInput({ name: "", subject: "", email: "", phone: "" });
      setEditId(null);
      setEditType(null);
      fetchAllTeachers();
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to add/update teacher", "error");
    }
  };

  // Delete Function
  const handleDelete = async (type, id) => {
    try {
      if (type === "all-students") {
        await deleteStudentAPI(id);
        Swal.fire("Deleted!", "Student removed successfully", "success");
        fetchAllStudents();
      } else {
        await deleteTeacherAPI(id);
        Swal.fire("Deleted!", "Teacher removed successfully", "success");
        fetchAllTeachers();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to delete record", "error");
    }
  };

  // Edit Function
  const handleEdit = (type, item) => {
    setEditId(item._id || item.id);
    setEditType(type === "all-students" ? "student" : "teacher");

    if (type === "all-students") {
      setStudentInput(item);
      setActiveStep(0);
    } else {
      setTeacherInput(item);
      setActiveStep(1);
    }
  };

  // Step navigation
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => setActiveStep(0);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div>
            <h2>Student Details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "16px" }}>
              <TextField label="Name" variant="standard" value={studentInput.name} onChange={(e) => setStudentInput({ ...studentInput, name: e.target.value })} />

              <TextField label="Roll No" variant="standard" value={studentInput.rollNo} onChange={(e) => setStudentInput({ ...studentInput, rollNo: e.target.value })} />
              <TextField
                label="Course"
                variant="standard"
                value={studentInput.course}
                onChange={(e) => setStudentInput({ ...studentInput, course: e.target.value })}
              />
              <TextField
                label="Teacher"
                variant="standard"
                value={studentInput.teacher}
                onChange={(e) => setStudentInput({ ...studentInput, teacher: e.target.value })}
              />
            </div>
            <Button variant="contained" onClick={handleAddStudent}>
              {editType === "student" ? "Update Student" : "Add Student"}
            </Button>
          </div>
        );

      case 1:
        return (
          <div>
            <h2>Teacher Details</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "16px" }}>
              <TextField
                label="Name"
                variant="standard"
                value={teacherInput.name}
                onChange={(e) => setTeacherInput({ ...teacherInput, name: e.target.value })}
              />
              <TextField
                label="Subject"
                variant="standard"
                value={teacherInput.subject}
                onChange={(e) => setTeacherInput({ ...teacherInput, subject: e.target.value })}
              />
              <TextField
                label="Email"
                variant="standard"
                value={teacherInput.email}
                onChange={(e) => setTeacherInput({ ...teacherInput, email: e.target.value })}
              />
              <TextField
                label="Phone"
                variant="standard"
                value={teacherInput.phone}
                onChange={(e) => setTeacherInput({ ...teacherInput, phone: e.target.value })}
              />
            </div>
            <Button variant="contained" color="success" onClick={handleAddTeacher}>
              {editType === "teacher" ? "Update Teacher" : "Add Teacher"}
            </Button>
          </div>
        );

      case 2:
        return (
          <div>
            <h2>Students</h2>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Roll No</th>
                  <th>Course</th>
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
                    <td>{s.teacher}</td>
                    <td>
                      <Button onClick={() => handleEdit("all-students", s)} variant="outlined" style={{ marginRight: "8px" }}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete("all-students", s._id || s.id)} color="error" variant="outlined">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>Teachers</h2>
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Name</th>
                  <th>Subject</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {teachers.map((t) => (
                  <tr key={t._id || t.id}>
                    <td>{t.name}</td>
                    <td>{t.subject}</td>
                    <td>{t.email}</td>
                    <td>{t.phone}</td>
                    <td>
                      <Button onClick={() => handleEdit("teachers", t)} variant="outlined" style={{ marginRight: "8px" }}>
                        Edit
                      </Button>
                      <Button onClick={() => handleDelete("teachers", t._id || t.id)} color="error" variant="outlined">
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={{ width: "80%", margin: "40px auto" }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === steps.length ? (
        <div style={{ marginTop: "20px" }}>
          <Typography style={{ marginBottom: "16px" }}>All steps completed!</Typography>
          <Button onClick={handleReset}>Reset</Button>
        </div>
      ) : (
        <div style={{ marginTop: "20px" }}>
          {renderStepContent(activeStep)}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px", marginTop: "20px" }}>
            {activeStep === 0 ? (
              <Link to="/logins" style={{ textDecoration: "none" }}>
                <Button variant="outlined">Back</Button>
              </Link>
            ) : (
              <Button variant="outlined" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button onClick={handleNext} variant="contained" color="primary">
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}



export default Admin;

