import React, { useEffect, useState } from "react";
import { FaFileDownload } from "react-icons/fa";
import { Divider, Box, Paper, Button, Typography } from "@mui/material";
import axios from "axios";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useParams } from "react-router-dom";
import BASE_URL from "../management/managementURL";

function Student() {
  const { id } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/all-students/${id}`);
        const s = {
          ...res.data,
          marks: res.data.marks || "",
          attendance: res.data.attendance || "",
        };
        setStudent(s);
      } catch (err) {
        console.error("Error fetching student data:", err);
      }
    };

    fetchStudent();
  }, [id]);

  const downloadPDF = async () => {
    const input = document.getElementById("studentDetails");
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${student.name}_details.pdf`);
  };

  if (!student) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <Box sx={{ textAlign: "center", mt: 5 }}>
      <Button
        variant="contained"
        color="primary"
        onClick={downloadPDF}
        startIcon={<FaFileDownload />}
        sx={{ mb: 3 }}
      >
        Download Details
      </Button>

      <div id="studentDetails">
        <Paper
          elevation={3}
          sx={{ p: 4, m: "auto", width: "70%", textAlign: "left" }}
        >
          <Typography variant="h4" sx={{ mb: 2 }}>
            {student.name}
          </Typography>

          <Typography>
            <strong>Roll No:</strong> {student.rollNo}
          </Typography>
          <Typography>
            <strong>Course:</strong> {student.course}
          </Typography>

          <Divider sx={{ my: 2 }}>Teacher Details</Divider>
          <Typography>
            <strong>Name:</strong> {student.teacher}
          </Typography>
          {student.subject && (
            <Typography>
              <strong>Subject:</strong> {student.subject}
            </Typography>
          )}
          {student.email && (
            <Typography>
              <strong>Email:</strong> {student.email}
            </Typography>
          )}
          {student.phone && (
            <Typography>
              <strong>Phone:</strong> {student.phone}
            </Typography>
          )}

          <Divider sx={{ my: 2 }}>Performance</Divider>
          <Typography>
            <strong>Marks:</strong> {student.marks || "N/A"}
          </Typography>
          <Typography>
            <strong>Attendance:</strong> {student.attendance || "N/A"}%
          </Typography>

          <Divider sx={{ my: 2 }}>Remarks</Divider>
          <Typography>
            {student.attendance >= 75
              ? "Good Attendance"
              : "Needs Improvement"}
          </Typography>
        </Paper>
      </div>
    </Box>
  );
}

export default Student;
