// import React from 'react'
// import './CSS/Contact.css'

// const Contact = () => {
//   return (
//     <div className='contact'>
//       <div className="contact-container">
//         <h1>Get in Touch</h1>
//         <p>We'd love to hear from you! Send us a message below.</p>
//         <div className="contact-fields">
//           <input type="text" placeholder='Your Name' />
//           <input type="email" placeholder='Email Address' />
//           <textarea placeholder='Type your message here...' rows="6"></textarea>
//           <button>Submit Message</button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Contact
import React, { useState } from 'react'; // <-- IMPORT useState
import './CSS/Contact.css';

const Contact = () => {
  // 1. STATE TO HOLD FORM DATA
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  // Handler to update state as user types
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. HANDLER TO SUBMIT DATA (This is where the API call goes)
  const handleSubmit = async () => {
    console.log("Submitting form data:", formData);
    
    // --- THIS IS WHERE YOU ADD YOUR API CALL ---
    /*
    let responseData;
    await fetch('YOUR_BACKEND_URL/sendcontact', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    }).then((response) => response.json()).then((data) => responseData = data);
    
    if (responseData.success) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // Clear form
    } else {
        alert("Failed to send message. Please try again.");
    }
    */
    
    // For now, we'll just show an alert until the backend is ready
    alert(`Thank you, ${formData.name}! Your message has been noted.`);
    setFormData({ name: "", email: "", message: "" }); // Clear the form
  };

  return (
    <div className='contact' >
      <div className="contact-container" style={{padding:"50px"}}>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you! Send us a message below.</p>
        <div className="contact-fields">
          {/* Inputs now tied to state and handler */}
          <input 
            type="text" 
            placeholder='Your Name' 
            name="name" // ADDED name attribute
            value={formData.name}
            onChange={handleChange}
          />
          <input 
            type="email" 
            placeholder='Email Address' 
            name="email" // ADDED name attribute
            value={formData.email}
            onChange={handleChange}
          />
          <textarea 
            placeholder='Type your message here...' 
            rows="6"
            name="message" // ADDED name attribute
            value={formData.message}
            onChange={handleChange}
          ></textarea>
          
          {/* Button now calls the handler */}
          <button onClick={handleSubmit}>Submit Message</button>
        </div>
      </div>
    </div>
  );
};

export default Contact;