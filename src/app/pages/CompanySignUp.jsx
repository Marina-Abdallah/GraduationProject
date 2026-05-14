import Navbar from "../components/Navbar";
import SignUpCard from "../components/CompanySignUpCard";
import { Footer } from "../components/Footer";
import "../../styles/App.css";
import { Box } from "@mui/material";

function CompanySignUp() {
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
      <SignUpCard />
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

export default CompanySignUp;
