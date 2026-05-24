import React, { useState, useRef } from "react";
import Typography from "@mui/material/Typography";
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
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Box from '@mui/material/Box';
import OtpModal from "./OTPoverlay";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "./AppContext";
import api from "../../api/axios";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

function CompanySignUpCard() {
    const { industries = [] } = useAppContext();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef(null);

    const handleUploadClick = () => {
        fileInputRef.current?.click();
    };

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

    const industryOptions = industries.length > 0
        ? industries
        : [{ id: "", name: "Industry" }];

    const phones = [
        { value: +20, label: 'Egypt(+20)', }
    ];

    const [openOtp, setOpenOtp] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        industryId: "",
        address: "",
        countryCode: "+20",
        phone: "",
        websiteUrl: "",
        pictureUrl: "",
    });

    const [photoFile, setPhotoFile] = useState(null);
    const [photoError, setPhotoError] = useState("");

    const handleChange = (e) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handlePhotoChange = (e) => {
        const file = e.target.files?.[0] || null;
        setPhotoFile(file);
        if (file) setPhotoError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!photoFile) {
            setPhotoError("Logo photo is required.");
            return;
        }

        try {
            const dataToSend = new FormData();
            dataToSend.append("name", form.name);
            dataToSend.append("email", form.email);
            dataToSend.append("password", form.password);
            dataToSend.append("confirmPassword", form.confirmPassword);
            dataToSend.append("industryId", String(Number(form.industryId)));
            dataToSend.append("address", form.address);
            dataToSend.append("phone", `${form.countryCode}${form.phone}`);
            dataToSend.append("websiteUrl", form.websiteUrl);
            dataToSend.append("pictureUrl", form.pictureUrl);
            if (photoFile) dataToSend.append("photo", photoFile);

            const res = await api.post("/Companies/Register", dataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            alert(res.data || "Company registered. OTP sent to email.");
            setOpenOtp(true);
        } catch (err) {
            console.log(err.response?.data);
            alert("Error registering company");
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
                Company Account</h1>
            <div style={{ marginBottom: 15 }}>
                <TextField
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    id="outlined"
                    label="Company Name"
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

            <div style={{ marginBottom: 15, textAlign: 'left' }}>
                <TextField
                    fullWidth
                    select
                    size="small"
                    label="Industry"
                    name="industryId"
                    value={form.industryId}
                    onChange={handleChange}>

                    {industryOptions.map((option) => (
                        <MenuItem key={option.id || option.name} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div style={{ marginBottom: 15 }}>
                <TextField
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    fullWidth
                    id="outlined"
                    label="Company Address"
                    size="small"

                />
            </div>

            <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                    id="outlined-select-currency"
                    name="countryCode"
                    value={form.countryCode}
                    onChange={handleChange}
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
            <div style={{ marginBottom: 10 }}>
                <TextField
                    name="websiteUrl"
                    value={form.websiteUrl}
                    onChange={handleChange}
                    fullWidth
                    type="URL"
                    id="outlined"
                    label="Website URL"
                    size="small"
                />
            </div>

            <div style={{ marginBottom: 10, textAlign: "left" }}>
                <InputLabel sx={{ mb: 0.25, fontSize: 12}}>Logo Photo</InputLabel>
                <Box sx={{ alignItems: "center", gap: 1 }}>
                    <Button
                        variant="outlined"
                        component="label"
                        onClick={handleUploadClick}
                        disabled={uploading}
                        startIcon={<CloudUploadOutlinedIcon />}
                        sx={{
                            borderColor: "#bfbebe",
                            color: "#656565",
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 500,
                            fontSize: "16px",
                            borderRadius: "4px",
                            px: 4,
                            py: 0.5,
                            width: "100%",
                            maxWidth: "320px",
                            textTransform: "none",
                            "&:hover": {borderColor: "#656565",borderWidth: "2px",bgcolor: "#f9f9fa" },
                        }}
                    >
                        {uploading ? "Uploading..." : "Upload Company Logo"}
                    </Button>
                    <input
                        hidden
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handlePhotoChange}
                        required
                    />
                    <Typography sx={{ fontSize: 12, color: "#656565" }}>
                        {photoFile ? photoFile.name : "No file selected"}
                    </Typography>
                </Box>
                {photoError && (
                    <Typography sx={{ mt: 0.5, fontSize: 12, color: "#d32f2f" }}>
                        {photoError}
                    </Typography>
                )}
            </div>



            <Button
                fullWidth
                onClick={handleSubmit}
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
                redirectPath="/CompanyLogin"
                email={form.email}
                verifyPath="/Companies/verify-email"
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
                size="small" onClick={() => goToPage("/CompanyLogin")}>Login Now</Button>
        </div>
    );
}

export default CompanySignUpCard;
