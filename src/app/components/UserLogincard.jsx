import React, { useState } from "react";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import GoogleIcon from '@mui/icons-material/Google';
import OtpModal from "./OTPoverlay";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";





function UserLoginCard() {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const navigate = useNavigate();
  const [, setAnchorEl] = React.useState(null);
  const [openOtp, setOpenOtp] = useState(false);
  const handleClose = () => setAnchorEl(null);

  const goToPage = (path) => {
    navigate(path);
    handleClose();
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const [form, setForm] = React.useState({
      email: "",
      password: ""
    });
    
  const handleLogin = async () => {

    const email = form.email;
    const password = form.password;

    try {
      const res = await api.post("/Users/Login", {
        email,
        password
      });

      alert("Login successful!");

      // save token
      localStorage.setItem("token", res.data.Token);

      // go to home
      navigate("/MyJobApplication");

    } catch (err) {
      console.log(err.response?.data);

      alert(err.response?.data || "Login failed");
    }
  };


  return (
    <div className="login-card">
      <h1
        style={{
          marginBottom: "10px",
          color: "#13206d",
          fontWeight: "bold"
        }}
      >
        Hello JobSeeker,</h1>
      <p
        style={{
          marginBottom: "25px",
          color: "#13206d",
          fontWeight: "bold"
        }}
      >
        Login To Your Account</p>

      {/* <input type="email" placeholder="Email Address" /> */}
      <div>
        <TextField
          name="email"
          value={form.email}
          onChange={handleChange}
          fullWidth
          type="email"
          id="outlined"
          label="Email Address"
          size="small"
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password" sx={{ top: "-7px" }}>Password</InputLabel>
          <OutlinedInput
            name="password"
            value={form.password}
            onChange={handleChange}
            size="small"
            label="Password"
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }

          />
        </FormControl>
      </div>

      <Button sx={{
        m: '8px',
        color: 'gray',
        textTransform: 'none',
        "&:hover": {
          backgroundColor: 'transparent',
        },
      }}
        size="small">Forgot Password?</Button>


      <Button fullWidth
        onClick={() => handleLogin()}
        sx={{
          fontWeight: 'bold',
          color: '#13206D',
          backgroundColor: '#84FBA2',
          textTransform: 'none',
          boxShadow: 'none', // extra safety
        }}
        variant="contained" >
        Login
      </Button>

      <p style={{ color: "gray", margin: 10 }}>- OR -</p>
      <Button fullWidth
        sx={{
          color: '#13206D',
          textTransform: 'none',
          boxShadow: 'none', // extra safety
        }}
        variant="outlined" >
        <GoogleIcon style={{ marginRight: 10 }} />
        Continue with Google
      </Button>

      <p className="register">Don't have an account?</p>
      <Button sx={{
        fontWeight: 'bold',
        color: '#84FBA2',
        "&:hover": {
          backgroundColor: 'transparent',
        },
      }}
        size="small"
        onClick={() => goToPage("/UserSignUp")}>Register Now</Button>
    </div>
  );
}

export default UserLoginCard;
