import React from 'react'
import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa'
import { Link } from 'react-router-dom'
function Adtest() {
     return (
    <>
  <div className='container'>
      <h1 className='text-center'>Welcome to Student Management System</h1>
      <p className='text-center text-muted'>Choose your login type to continue</p>
      <div className='row mt-5'>
       <div className='col-md-4 mb-4'>
            <div className='shadow rounded p-5 text-center'>
              <FaUserShield className='fs-1 mb-3 text-danger' />
              <h2>Admin Login</h2>
              <p>Manage users, courses, and overall system settings.</p>
              <Link to="/admin" className='btn btn-danger mt-3'>Login as Admin</Link>
            </div>
          </div>

          <div className='col-md-4 mb-4'>
            <div className='shadow rounded p-5 text-center'>
              <FaChalkboardTeacher className='fs-1 mb-3 text-primary' />
              <h2>Teacher Login</h2>
              <p>Access student data, mark attendance, and upload grades.</p>
              <Link to="/teacher" className='btn btn-primary mt-3'>Login as Teacher</Link>
            </div>
          </div>

          <div className='col-md-4 mb-4'>
            <div className='shadow rounded p-5 text-center'>
              <FaUserGraduate className='fs-1 mb-3 text-success' />
              <h2>Student Login</h2>
              <p>View attendance, grades, and course materials.</p>
              <Link to="/studentlogin" className='btn btn-success mt-3'>Login as Student</Link>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Adtest