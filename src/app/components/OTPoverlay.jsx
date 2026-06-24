import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  Typography,
  Box,
  TextField,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";

function OtpModal({ open, handleClose, redirectPath, email, verifyPath }) {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // move to next input safely
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const verifyOtp = async () => {

    try {
        const code = otp.join("");
        const res = await api.post(verifyPath, {
          email,
          Otp: code
        });
        toast.success(res.data);
        handleClose();
        navigate(redirectPath);
    } catch (err) {
        console.log(err.response?.data);
        toast.error("Invalid OTP");
    }
  };

  const resendOtp = () => {
    toast.success("OTP resent!");
  };


  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#90BAEF",
          width: "600px",
          maxWidth: "95%",
          borderRadius: "24px",
          padding: 4,
          textAlign: "center",
        },
      }}
    >
      <DialogContent>

        {/* Title */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            color: "#13206D",
            mb: 1,
          }}
        >
          OTP Verification
        </Typography>

        {/* Subtitle */}
        <Typography
          sx={{
            color: "#13206D",
            fontSize: "16px",
            mb: 4,
          }}
        >
          Enter the 6-digit code sent to your email
        </Typography>

        {/* OTP Inputs */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
            mb: 4,
          }}
        >
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={(el) => (inputsRef.current[index] = el)}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              inputProps={{
                maxLength: 1,
                style: {
                  color: "#13206d",
                  textAlign: "center",
                  fontSize: "28px",
                  fontWeight: "bold",
                },
              }}
              sx={{
                width: "70px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "14px",
                },
              }}
            />
          ))}
        </Box>

        {/* Buttons Row */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            onClick={resendOtp}
            sx={{
              color: "#13206D",
              fontWeight: "bold",
              textTransform: "none",
              width: 180,
            }}
          >
            Resend Code
          </Button>

          <Button
            variant="contained"
            onClick={verifyOtp}
            sx={{
              width: 180,
              backgroundColor: "#84FBA2",
              color: "#13206D",
              fontWeight: "bold",
              fontSize: "15px",
              textTransform: "none",
              borderRadius: "14px",
              "&:hover": {
                backgroundColor: "#6ff18f",
              },
            }}
          >
            Verify OTP
          </Button>
        </Box>

      </DialogContent>
    </Dialog>
  );
}

export default OtpModal;