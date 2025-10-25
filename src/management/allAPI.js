import commonAPI from "./commonAPI";
import BASEURL from "./managementURL";

// ---------------------- STUDENT APIs ----------------------

// Add a new student (Admin or Teacher)
export const addStudentAPI = async (reqBody) => {
  return await commonAPI("POST", `${BASEURL}/all-students`, reqBody)
}

//  Get all students (Admin or Teacher)
export const getAllStudentsAPI = async () => {
  return await commonAPI("GET", `${BASEURL}/all-students`)
}

// Get single student (Student / Teacher / Admin)
export const getAStudentAPI = async (id) => {
  return await commonAPI("GET", `${BASEURL}/all-students/${id}`, {})
}

//  Update student details (Admin or Teacher)
export const updateStudentAPI = async (id, reqBody) => {
  return await commonAPI("PUT", `${BASEURL}/all-students/${id}`, reqBody)
}

//  Delete a student (Admin)
export const deleteStudentAPI = async (id) => {
  return await commonAPI("DELETE", `${BASEURL}/all-students/${id}`)
}


// ---------------------- TEACHER APIs ----------------------

//  Add teacher (Admin)
export const addTeacherAPI = async (reqBody) => {
  return await commonAPI("POST", `${BASEURL}/teachers`, reqBody)
}

// Get all teachers (Admin or Teacher)
export const getAllTeachersAPI = async () => {
  return await commonAPI("GET", `${BASEURL}/teachers`)
}

//  Update teacher info (Admin)
export const updateTeacherAPI = async (id, reqBody) => {
  return await commonAPI("PUT", `${BASEURL}/teachers/${id}`, reqBody)
}

// Delete teacher (Admin)
export const deleteTeacherAPI = async (id) => {
  return await commonAPI("DELETE", `${BASEURL}/teachers/${id}`)
}


// ---------------------- ADMIN APIs ----------------------

//  Get admin details (for login verification)
export const getAdminAPI = async () => {
  return await commonAPI("GET", `${BASEURL}/admin`)
}
