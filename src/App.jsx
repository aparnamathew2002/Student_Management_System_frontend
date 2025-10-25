import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';

import Footer from './Components/Footer';
import Adtest from './Pages/Adtest';
import Admin from './Components/Admin';
import Teacher from './Components/Teacher';
import Student from './Components/Student';
import StudentLogin from './Components/StudentLogin';
function App() {
 

  return (
    <>
      
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/logins" element={<Adtest />} />
         <Route path="/admin" element={<Admin />} />
          <Route path="/teacher" element={<Teacher />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
           <Route path="/student/:id" element={<Student />} />
      </Routes>
    

    <Footer />
    </>
  )
}

export default App
