import { useState } from "react";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSubmitted(true);

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="container py-5">

      {/* HEADER */}

      <div className="text-center mb-5">

        <div
          className="d-inline-flex align-items-center justify-content-center rounded-circle bg-danger text-white mb-3"
          style={{
            width: "85px",
            height: "85px",
            fontSize: "40px",
          }}
        >
          📞
        </div>

        <h1 className="display-4 fw-bold">
          Contact ResQAI
        </h1>

        <p className="lead text-muted">
          Have a question, suggestion or feedback?
          We'd love to hear from you.
        </p>

      </div>

      <div className="row g-4">

        {/* LEFT SIDE */}

        <div className="col-lg-5">

          <div className="card shadow-lg border-0 h-100">

            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                📬 Get In Touch
              </h3>

              <div className="d-flex mb-4">

                <div
                  className="bg-danger text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    minWidth: "50px",
                  }}
                >
                  📧
                </div>

                <div>
                  <h5 className="mb-1">
                    Email
                  </h5>

                  <p className="text-muted mb-0">
                    resqai.team@gmail.com
                  </p>
                </div>

              </div>

              <div className="d-flex mb-4">

                <div
                  className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    minWidth: "50px",
                  }}
                >
                  📞
                </div>

                <div>
                  <h5 className="mb-1">
                    Phone
                  </h5>

                  <p className="text-muted mb-0">
                    +91 6305513540
                  </p>
                </div>

              </div>

              <div className="d-flex mb-4">

                <div
                  className="bg-success text-white rounded-circle d-flex align-items-center justify-content-center me-3"
                  style={{
                    width: "50px",
                    height: "50px",
                    minWidth: "50px",
                  }}
                >
                  📍
                </div>

                <div>
                  <h5 className="mb-1">
                    Location
                  </h5>

                  <p className="text-muted mb-0">
                    India
                  </p>
                </div>

              </div>

              <hr />

              {/* EMERGENCY MESSAGE */}

              <div className="alert alert-danger mt-4">

                <h5 className="fw-bold">
                  🚨 Emergency?
                </h5>

                <p className="mb-0">
                  If you are facing an actual emergency,
                  don't use the contact form.
                  Use the <strong>SOS</strong> feature
                  immediately.
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE - CONTACT FORM */}

        <div className="col-lg-7">

          <div className="card shadow-lg border-0">

            <div className="card-body p-4">

              <h3 className="fw-bold mb-4">
                ✉️ Send Us a Message
              </h3>

              {submitted && (
                <div className="alert alert-success">

                  <strong>✅ Message Submitted!</strong>

                  <br />

                  Thank you for contacting the
                  ResQAI team. We will get back to
                  you soon.

                </div>
              )}

              <form onSubmit={handleSubmit}>

                {/* NAME */}

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Your Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* EMAIL */}

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* SUBJECT */}

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Subject
                  </label>

                  <select
                    name="subject"
                    className="form-select"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  >

                    <option value="">
                      Select a subject
                    </option>

                    <option value="General Question">
                      General Question
                    </option>

                    <option value="Feedback">
                      Feedback
                    </option>

                    <option value="Bug Report">
                      Bug Report
                    </option>

                    <option value="Feature Request">
                      Feature Request
                    </option>

                    <option value="Technical Support">
                      Technical Support
                    </option>

                  </select>

                </div>

                {/* MESSAGE */}

                <div className="mb-3">

                  <label className="form-label fw-bold">
                    Message
                  </label>

                  <textarea
                    name="message"
                    rows="6"
                    className="form-control"
                    placeholder="Write your message..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                </div>

                {/* SUBMIT */}

                <button
                  type="submit"
                  className="btn btn-danger w-100 py-2"
                >
                  📩 Send Message
                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

      {/* PROJECT INFORMATION */}

      <div className="mt-5">

        <div className="card shadow-lg border-0">

          <div className="card-body p-5 text-center">

            <div className="display-3 mb-3">
              🚨
            </div>

            <h2 className="fw-bold">
              ResQAI
            </h2>

            <p className="lead text-muted">
              AI-Powered Disaster Response &
              Emergency Coordination Platform
            </p>

            <div className="row mt-4">

              <div className="col-md-4 mb-3">

                <h4>🤖 AI</h4>

                <p className="text-muted">
                  Intelligent disaster analysis
                  and emergency information.
                </p>

              </div>

              <div className="col-md-4 mb-3">

                <h4>📍 Location</h4>

                <p className="text-muted">
                  GPS-powered emergency
                  location tracking.
                </p>

              </div>

              <div className="col-md-4 mb-3">

                <h4>🚑 Rescue</h4>

                <p className="text-muted">
                  Rescue team coordination
                  and emergency management.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

      {/* FOOTER */}

      <div className="text-center mt-5">

        <p className="text-muted mb-1">
          Built with ❤️ for safer communities.
        </p>

        <p className="small text-muted">
          ResQAI • Emergency Response Platform
        </p>

      </div>

    </div>
  );
}

export default Contact;