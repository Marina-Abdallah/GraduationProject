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

function CompanySignUpCard() {
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

    const [industry, setIndustry] = useState("");
    const industries = [
        { id: 1, label: 'Software Industry', },
        { id: 2, label: 'Marketing Agency', }
    ];

    const phones = [
        { value: +20, label: 'Egypt(+20)', }
    ];

    const [openOtp, setOpenOtp] = useState(false);

    return (
        <div className="SignUp-card">
             <h1
                style={{
                    marginBottom: "10px",
                    color: "#13206d",
                    fontWeight: "bold"
                }}
            >
                Company Account</h1>
            <div style={{ marginBottom: 15 }}>
                <TextField
                    fullWidth
                    id="outlined"
                    label="Company Name"
                    size="small"

                />
            </div>

            <div style={{ marginBottom: 18 }}>
                <TextField
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

            <div style={{ marginBottom: 15, textAlign: 'left' }}>
                <TextField
                    fullWidth
                    select
                    size="small"
                    label="Industry"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}>

                    {industries.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div style={{ marginBottom: 15 }}>
                <TextField
                    fullWidth
                    id="outlined"
                    label="Company Adress"
                    size="small"

                />
            </div>

            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    id="outlined-select-currency"
                    select
                    sx={{ width: 130, marginBottom: '15px' }}
                    size="small"
                    label="Select"
                >
                    {phones.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
                <div style={{ width: 300, marginBottom: 15 }}>
                    <TextField
                        fullWidth
                        id="outlined"
                        label="Phone Number"
                        size="small"

                    />
                </div>
            </Box>
            <div style={{ marginBottom: 18 }}>
                <TextField
                    fullWidth
                    type="URL"
                    id="outlined"
                    label="Website URL"
                    size="small"
                />
            </div>
            <div style={{ marginBottom: 18 }}>
                <TextField
                    fullWidth
                    type="URL"
                    id="outlined"
                    label="Logo URL"
                    size="small"
                />
            </div>
            <Button
                fullWidth
                onClick={() => setOpenOtp(true)}
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
                redirectPath="/CompanyJobs"
            />

            <p style={{ color: "gray" ,margin:10 }}>- OR -</p>
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
                size="small" onClick={() => goToPage("/CompanyLogin")}>Register Now</Button>
        </div>
    );
}

export default CompanySignUpCard;
