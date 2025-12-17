import React, { useState } from 'react';
import Swal from 'sweetalert2'; // 1. Import SweetAlert2
import './CSS/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSending, setIsSending] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      // Custom Error Popup
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields!',
        confirmButtonColor: '#ff4141'
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('https://quick-cart-backend-z224.onrender.com/sendcontact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (data.success) {
        // 2. SUCCESS ANIMATION POPUP
        Swal.fire({
          icon: 'success',
          title: 'Sent!',
          text: data.message,
          showConfirmButton: false,
          timer: 3000, // Closes automatically after 3 seconds
          iconColor: '#ff4141'
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: data.message || "Something went wrong.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Connection Error',
        text: 'Could not reach the server.',
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className='contact' >
      <div className="contact-container" style={{padding:"50px"}}>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you! Send us a message below.</p>
        <div className="contact-fields">
          <input 
            type="text" 
            placeholder='Your Name' 
            name="name" 
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            type="email" 
            placeholder='Email Address' 
            name="email" 
            value={formData.email}
            onChange={handleChange}
          />
          <textarea 
            placeholder='Type your message here...' 
            rows="6"
            name="message" 
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          
          <button 
            onClick={handleSubmit} 
            disabled={isSending}
            style={{ 
              backgroundColor: isSending ? "#ccc" : "#ff4141", 
              cursor: isSending ? "not-allowed" : "pointer",
              transition: "0.3s"
            }}
          >
            {isSending ? "Sending..." : "Submit Message"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;