import React, { useState } from 'react';

const Contact = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const submitRequest = async (e) => {
    e.preventDefault();
    console.log({ email, message });
    const response = await fetch("/access", { 
      method: 'POST', 
      headers: { 
          'Content-type': 'application/json'
      }, 
      body: JSON.stringify({email, message}) 
  }); 
    const resData = await response.json(); 
    if (resData.status === 'success'){
      alert("Message Sent."); 
      this.resetForm()
  }else if(resData.status === 'fail'){
      alert("Message failed to send.")
  }
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center bg-gray-200"></div>
      <div className="w-full max-w-sm m-auto flex flex-col my-32">
        <form
          className="form"
          onSubmit={submitRequest}
        >
          <h2 className="large text-primary">
            Contact Form
          </h2>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Email"
            >
              Your Email
            </label>
            <input
              className="form-group"
              type="text"
              name="email"
              placeholder="Email Address"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="form-group"
              htmlFor="message"
            >
              Message For Us
            </label>
            <textarea
              className="form-text"
              name="message"
              type="text"
              placeholder="Tell us your purpose"
              onChange={e => setMessage(e.target.value)}
              value={message}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="btn btn-primary"
              type="submit"
            >
              Send A Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;