import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllStudentsAPI } from "../management/allAPI";
import { Box, Button, TextField } from "@mui/material";
import Swal from "sweetalert2";

function StudentLogin() {
  const [students, setStudents] = useState([]);
  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  // Fetch all students
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getAllStudentsAPI(); 
        console.log("Students fetched:", data);
        setStudents(data);
      } catch (err) {
        console.error("Error fetching students:", err);
      }
    };
    fetchStudents();
  }, []);

  // Handle login
  const handleLogin = () => {
    if (!rollNo || !name) {
      Swal.fire("Error", "Please enter both Roll No and Name", "error");
      return;
    }

    const student = students.find(
      (s) =>
        String(s.rollNo).trim() === rollNo.trim() &&
        s.name.trim().toLowerCase() === name.trim().toLowerCase()
    );

    if (!student) {
      Swal.fire("Error", "Invalid Roll No or Name", "error");
      return;
    }

   
    navigate(`/student/${student._id || student.id}`);
  };

  return (
    <Box sx={{ textAlign: "center", mt: 10 }}>
      <h1>Student Login</h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <TextField
          label="Roll No"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          variant="outlined"
          sx={{ width: 300 }}
        />

        <TextField
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
          sx={{ width: 300 }}
        />
      </div>

      <Button variant="contained" color="success" onClick={handleLogin}>
        Login
      </Button>
    </Box>
  );
}

export default StudentLogin;
