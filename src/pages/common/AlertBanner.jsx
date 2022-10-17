import { Alert } from "react-bootstrap";

export default function AlertBanner({ message, variant }) {
  const aletMessage =
    message || "An unexpected error occured. Please try again later.";
  const alertVariant = variant || "danger";

  return (
    <Alert variant={alertVariant} style={{ backgroundColor: "red" }}>
      {aletMessage}
    </Alert>
  );
}
