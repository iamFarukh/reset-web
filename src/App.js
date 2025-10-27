import React, { useState } from "react";

// Enhanced styles for a modern, minimal look
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f0f4f8, #c8d9e6)",
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    padding: "20px",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)",
    width: "100%",
    maxWidth: "400px",
    textAlign: "center",
    transition: "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
  },
  title: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "20px",
    fontWeight: "600",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  input: {
    padding: "12px 15px",
    borderRadius: "8px",
    border: "1px solid #e0e0e0",
    fontSize: "1rem",
    transition: "border-color 0.3s, box-shadow 0.3s",
    "&:focus": {
      borderColor: "#007bff",
      boxShadow: "0 0 0 3px rgba(0, 123, 255, 0.25)",
      outline: "none",
    },
  },
  button: {
    background: "#007bff",
    color: "white",
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s, transform 0.1s",
    "&:hover": {
      backgroundColor: "#0056b3",
    },
    "&:active": {
      transform: "scale(0.99)",
    },
    "&:disabled": {
      background: "#a0c4ff",
      cursor: "not-allowed",
    },
  },
  successIcon: {
    fontSize: "4rem",
    color: "#28a745", // Green color for success
    marginBottom: "15px",
    animation: "pop 0.5s ease-out",
  },
  successText: {
    fontSize: "1.1rem",
    color: "#555",
    marginBottom: "25px",
  },
  // Keyframes for the pop animation (for the icon)
  keyframes: `
    @keyframes pop {
      0% { transform: scale(0); opacity: 0; }
      70% { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1); }
    }
  `,
};

// Component to handle the custom styling for inputs and button
const Input = (props) => (
  <input
    {...props}
    style={{ ...styles.input, ...(props.style || {}) }}
    // The hover/focus styles in the styles object need a CSS-in-JS library
    // or external CSS to work perfectly, but for this single-file dummy,
    // this provides the base look.
  />
);

const Button = (props) => (
  <button {...props} style={{ ...styles.button, ...(props.style || {}) }} />
);

function App() {
  const [step, setStep] = useState("form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Check if passwords match
  const passwordsMatch = password && password === confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!passwordsMatch) {
      alert("Passwords don't match!"); // Simple validation feedback
      return;
    }

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("success");
    }, 1500); // Increased timeout for better loading visualization
  };

  const handleRedirect = () => {
    // Redirect back to mobile app via deep link
    window.location.href = "blsapp://login";
  };

  // Inject keyframes into the document head
  React.useEffect(() => {
    if (document.getElementById("pop-keyframes")) return;
    const styleSheet = document.createElement("style");
    styleSheet.id = "pop-keyframes";
    styleSheet.innerText = styles.keyframes;
    document.head.appendChild(styleSheet);
  }, []);

  return (
    <div style={styles.container}>
      {/* State: Form */}
      {step === "form" && (
        <div style={styles.card}>
          <h2 style={styles.title}>🔒 Reset Your Password</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <Input
              type="password"
              placeholder="Enter new password (min 8 chars)"
              required
              minLength="8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitting}
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isSubmitting}
            />
            <Button type="submit" disabled={!passwordsMatch || isSubmitting}>
              {isSubmitting ? "Changing..." : "Change Password"}
            </Button>
            {!passwordsMatch && password && confirmPassword && (
              <p style={{ color: "red", fontSize: "0.9rem" }}>
                Passwords do not match.
              </p>
            )}
          </form>
        </div>
      )}

      {/* State: Success */}
      {step === "success" && (
        <div style={styles.card}>
          <div style={styles.successIcon}>✓</div>
          <h2 style={styles.title}>Password Updated! 🎉</h2>
          <p style={styles.successText}>
            Your password has been securely updated. You can now return to the
            app.
          </p>
          <Button onClick={handleRedirect}>Back to App</Button>
        </div>
      )}
    </div>
  );
}

export default App;
