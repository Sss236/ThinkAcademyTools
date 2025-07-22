import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer style={{
      marginTop: "20px",
      padding: "20px",
      textAlign: "center",
      fontSize: "14px"
    }}>
      <div style={{ marginBottom: "10px" }}>
        <Link to="/about" style={{ margin: "0 10px" }}>About</Link>
        <Link to="/privacy-policy" style={{ margin: "0 10px" }}>Privacy Policy</Link>
        <Link to="/terms-of-service" style={{ margin: "0 10px" }}>Terms</Link>
        <Link to="/contact" style={{ margin: "0 10px" }}>Contact</Link>
        <Link to="/faq" style={{ margin: "0 10px" }}>FAQ</Link>
      </div>
      <div style={{ color: "#999" }}>
        © {new Date().getFullYear()} Bay Area School Finder
      </div>
    </footer>
  );
}
