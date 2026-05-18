import Navbar from "../components/Navbar";
import SignUpCard from "../components/CompanySignUpCard";
import { Footer } from "../components/Footer";
import { Box } from "@mui/material";
import backgroundImg from "../../assets/Background.png";


function CompanySignUp() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `url(${backgroundImg})`,
        backgroundSize: "cover",
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
    </Box>
  );
}

export default CompanySignUp;
