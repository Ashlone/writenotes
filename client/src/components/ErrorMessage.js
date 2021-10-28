import React from "react";
import { Alert } from "react-bootstrap";

const ErrorMessage = ({ variant = "info", children }) => {
  return (
    <Alert
      variant={variant}
      style={{
        fontSize: 15,
        color: "#1c0c5b",
        marginTop: "30px",
        background: "none",
      }}
    >
      <strong>{children}</strong>
    </Alert>
  );
};

export default ErrorMessage;
