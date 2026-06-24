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
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import OtpModal from "./OTPoverlay";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "sonner";

function UserSignUpCard() {
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
    const handleClose = () => setAnchorEl(null);

    const goToPage = (path) => {
        navigate(path);
        handleClose();
    };
    const currencies = [
        {
            value: '+20',
            label: 'Egypt(+20)',
        }];
    const [openOtp, setOpenOtp] = useState(false);

    const [form, setForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        birthdate: "",
        countryCode: "+20",
        phone: ""
    });
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const dataToSend = {
                ...form,
                phone: `${form.countryCode}${form.phone}`
            };

            const res = await api.post("/Users/Register", dataToSend);

            console.log(res.data);
            toast.success("User registered. OTP sent to email.");

            // open OTP modal
            setOpenOtp(true);

        } catch (err) {
            console.log(err.response?.data);
            toast.error("Error registering user");
        }
    };

    return (
        <div className="SignUp-card">
            <h1
                style={{
                    marginBottom: "10px",
                    color: "#13206d",
                    fontWeight: "bold"
                }}
            >
                User Account</h1>
            <div style={{ marginBottom: 15 }}>
                <TextField
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    fullWidth
                    id="outlined"
                    label="First Name"
                    size="small"

                />
            </div>
            <div style={{ marginBottom: 15 }}>
                <TextField
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    fullWidth
                    id="outlined"
                    label="Last Name"
                    size="small"
                />
            </div>
            <div style={{ marginBottom: 18 }}>
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

            <div style={{ marginBottom: 18 }}>
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
            <div style={{ marginBottom: 15 }}>
                <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password" sx={{ top: "-7px" }}>Confirm</InputLabel>
                    <OutlinedInput
                        name="confirmPassword"
                        value={form.confirmPassword}
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
            <div style={{ marginBottom: 15 }}>
                <TextField
                    name="birthdate"
                    value={form.birthdate}
                    onChange={handleChange}
                    size="small"
                    type="date"
                    fullWidth
                    InputLabelProps={{
                        shrink: true,
                    }}
                    sx={{
                        "& .MuiSvgIcon-root": {
                            color: "gray",
                        }
                    }}
                />
            </div>
            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
                    id="outlined-select-currency"
                    select
                    sx={{ width: 130, marginBottom: '15px' }}
                    size="small"
                    label="Select"
                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{ width: 300, marginBottom: 15 }}>
                    <TextField
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        fullWidth
                        id="outlined"
                        label="Phone Number"
                        size="small"

                    />
                </div>
            </Box>
            <Button
                onClick={handleSubmit}
                fullWidth
                //onClick={() => setOpenOtp(true)}
                sx={{

                    fontWeight: 'bold',
                    color: '#13206D',
                    backgroundColor: '#84FBA2',
                    textTransform: 'none',
                    boxShadow: 'none', // extra safety
                }}
                variant="contained" >
                Sign Up
            </Button>

            <OtpModal
                open={openOtp}
                handleClose={() => setOpenOtp(false)}
                redirectPath="/UserLogin"
                email={form.email}
                verifyPath = "/Users/verify-email"
            />

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

            <p className="register">Already have an account?</p>
            <Button sx={{
                fontWeight: 'bold',
                color: '#84FBA2',
                "&:hover": {
                    backgroundColor: 'transparent',
                },
            }}
                size="small" onClick={() => goToPage("/UserLogin")}>Login Now</Button>
        </div>
    );
}

export default UserSignUpCard;
