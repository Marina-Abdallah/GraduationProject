import Navbar from '../components/Navbar';
import LoginCard from "../components/CompanyLoginCard";
import { Footer } from "../components/Footer";
import "../../styles/App.css";
import { Box } from "@mui/material";

function CompanyLogin() {
  return (
    <div className="page-container">
      <Box
        sx={{
          width: "100%",
          pt: 4,
          px: { xs: 2, md: 4 },
          position: "relative",
          zIndex: 20,
        }}
      >
        <Navbar />
      </Box>
      <LoginCard />
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Footer />
      </Box>
    </div>
  );
}

export default CompanyLogin;
