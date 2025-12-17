import React, { useState } from 'react';
import Swal from 'sweetalert2';
import emailjs from '@emailjs/browser';
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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out all fields!',
        confirmButtonColor: '#ff4141'
      });
      return;
    }

    setIsSending(true);

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(), 
    };

    try {
      // Using your verified IDs
      const result = await emailjs.send(
        'service_zg5okmg', 
        'template_e9ccttr', 
        templateParams, 
        'n0v6h6HccDWMHPWpN'
      );

      if (result.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'Sent!',
          text: 'Thank you! Your message has been sent successfully.',
          showConfirmButton: false,
          timer: 3000,
          iconColor: '#ff4141'
        });
        setFormData({ name: "", email: "", message: "" });
      }
    } catch (error) {
      console.error("EmailJS Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Failed to send message. Please try again later.',
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