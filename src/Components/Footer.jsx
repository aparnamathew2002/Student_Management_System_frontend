import React from 'react'

function Footer() {
  return (
    <>
    <footer class="bg-dark text-light pt-5 pb-3">
    <div class="container">
    <div class="row">

      
      <div class="col-md-4 mb-4">
        <h5 class="mb-3">Student Management System</h5>
        <p>
          A simple and efficient platform to manage student records with ease.
        </p>
      </div>

    
      <div class="col-md-4 mb-4">
        <h5 class="mb-3">Quick Links</h5>
        <ul class="list-unstyled">
          <li><a href="#about" class="text-decoration-none text-light">Home</a></li>
          <li><a href="#departments" class="text-decoration-none text-light">Features</a></li>
          <li><a href="#contact" class="text-decoration-none text-light">Contact</a></li>
        </ul>
      </div>

   
      <div class="col-md-4 mb-4">
        <h5 class="mb-3">Contact Info</h5>
        
        <p>📞 +91 98765 43210</p>
        <p>✉️ support@management.com</p>
        
        <div class="mt-3">
          <a href="#" class="text-light me-3"><i class="bi bi-facebook fs-4"></i></a>
          <a href="#" class="text-light me-3"><i class="bi bi-twitter fs-4"></i></a>
          <a href="#" class="text-light me-3"><i class="bi bi-instagram fs-4"></i></a>
          <a href="#" class="text-light"><i class="bi bi-linkedin fs-4"></i></a>
        </div>
      </div>

    </div>

  
    <div class="text-center border-top border-light pt-3 mt-3">
      <p class="mb-0">&copy; 2025 StudentManagementSystem. All Rights Reserved.</p>
    </div>
  </div>
    </footer>
    </>
  )
}

export default Footer