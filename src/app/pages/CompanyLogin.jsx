import Navbar from '../components/Navbar';
import LoginCard from "../components/CompanyLoginCard";
import { Footer } from "../components/Footer";
import { Box } from "@mui/material";
import backgroundImg from "../../assets/Background.png";


function CompanyLogin() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `url(${backgroundImg})`,
        backgroundSize: "100% auto",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "top center",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
      }}
    >
      <Box
        sx={{
          width: "100%",
          pt: 3,
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
    </Box>
  );
}

export default CompanyLogin;
