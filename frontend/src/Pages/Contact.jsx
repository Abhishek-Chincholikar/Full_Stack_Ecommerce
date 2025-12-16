import React from 'react'
import './CSS/Contact.css'

const Contact = () => {
  return (
    <div className='contact' >
      <div className="contact-container" style={{padding:"50px"}}>
        <h1>Get in Touch</h1>
        <p>We'd love to hear from you! Send us a message below.</p>
        <div className="contact-fields">
          <input type="text" placeholder='Your Name' />
          <input type="email" placeholder='Email Address' />
          <textarea placeholder='Type your message here...' rows="6"></textarea>
          <button>Submit Message</button>
        </div>
      </div>
    </div>
  )
}

export default Contact