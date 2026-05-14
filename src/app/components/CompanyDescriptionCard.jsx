import React, { useState, useRef } from "react";
import {
    Box,
    Typography,
    Button,
    TextField,
    Grid,
    MenuItem,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import CheckIcon from "@mui/icons-material/Check";
import { useAppContext } from "./AppContext";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

const inputFieldSx = {
    "& .MuiOutlinedInput-root": {
        borderRadius: "8px",
        bgcolor: "rgba(255,255,255,0.55)",
        "& fieldset": { borderColor: "rgba(19,32,109,0.2)" },
        "&:hover fieldset": { borderColor: GREEN },
        "&.Mui-focused fieldset": { borderColor: NAVY },
    },
    "& input, & textarea": {
        color: NAVY,
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
    },
    "& .MuiSelect-select": {
        color: NAVY,
        fontFamily: "'Inter', sans-serif",
        fontSize: "14px",
    },
    "& .MuiSvgIcon-root": {
        color: NAVY,
    },
    "& .MuiInputBase-input.Mui-disabled": {
        WebkitTextFillColor: "rgba(19,32,109,0.75)",
    },
};

const labelSx = {
    color: "#13206d",
    fontSize: "15px",
    fontWeight: 600,
    fontFamily: "'Inter', sans-serif",
    mb: "4px",
};
const Industries = ["Software Industry", "Marketing Agency",];

export function CompanyDescriptionCard() {
    const { company = {}, updateCompany } = useAppContext();
    const [editMode, setEditMode] = useState(false);
    const [draft, setDraft] = useState({});

    const handleEdit = () => {
        setDraft({
            name: company.name,
            email: company.email,
            overview: company.overview,
            industry: company.industry,
            website: company.website,
            address: company.address,
            phoneNumber: company.phoneNumber,
        });
        setEditMode(true);
    };

    const handleSave = () => {
        updateCompany(draft);
        setEditMode(false);
    };

    const handleCancel = () => {
        setEditMode(false);
        setDraft({});
    };

    const val = (key) => {
        if (editMode) {
            return draft?.[key] ?? "";
        }
        return company?.[key] ?? "";
    };

    const set = (key) => (e) => {
        setDraft((prev) => ({
            ...prev,
            [key]: e.target.value,
        }));
    };



    return (
        <Box
            sx={{
                bgcolor: "#fafafa",
                borderRadius: "16px",
                p: "28px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
                boxShadow: "0px 8px 8px 0px rgba(132,251,162,0.5)",
            }}
        >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
                <Typography
                    sx={{
                        color: "#13206d",
                        fontSize: "28px",
                        fontWeight: 600,
                        fontFamily: "'Inter', sans-serif",
                    }}
                >
                    Profile description
                </Typography>

                <Box sx={{ display: "flex", gap: 1 }}>
                    {editMode ? (
                        <>
                            <Button
                                onClick={handleSave}
                                startIcon={<CheckIcon />}
                                sx={{
                                    bgcolor: "#84fba2",
                                    color: "#13206d",
                                    fontWeight: 600,
                                    borderRadius: "8px",
                                    px: 3,
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "#6ef094" },
                                }}
                            >
                                Save
                            </Button>
                            <Button
                                onClick={handleCancel}
                                sx={{
                                    bgcolor: "transparent",
                                    color: "#13206d",
                                    borderRadius: "8px",
                                    border: "1px solid rgba(19,32,109,0.3)",
                                    px: 2,
                                    textTransform: "none",
                                    "&:hover": { bgcolor: "rgba(19,32,109,0.05)" },
                                }}
                            >
                                Cancel
                            </Button>
                        </>
                    ) : (
                        <Button
                            onClick={handleEdit}
                            startIcon={<EditOutlinedIcon />}
                            sx={{
                                bgcolor: "#84fba2",
                                color: "#13206d",
                                fontWeight: 500,
                                borderRadius: "8px",
                                px: 3,
                                textTransform: "none",
                                "&:hover": { bgcolor: "#6ef094" },
                            }}
                        >
                            Edit Profile Description
                        </Button>
                    )}
                </Box>
            </Box>
            {/* Company Name + Email */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Company Name</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        disabled={!editMode}
                        value={val("name")}
                        onChange={set("name")}
                        sx={inputFieldSx}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Email Address</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        disabled={!editMode}
                        value={val("email")}
                        onChange={set("email")}
                        sx={inputFieldSx}
                    />
                </Grid>
            </Grid>

            {/* OVERVIEW */}
            <Box>
                <Typography sx={labelSx}>Overview</Typography>
                <TextField
                    fullWidth
                    multiline
                    minRows={3}
                    maxRows={6}
                    disabled={!editMode}
                    value={val("overview")}
                    onChange={set("overview")}
                    sx={inputFieldSx}
                />
            </Box>

            {/* Industry + Website */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Industry</Typography>
                    <TextField
                        fullWidth
                        select
                        size="small"
                        disabled={!editMode}
                        value={val("industry")}
                        onChange={set("industry")}
                        sx={inputFieldSx}
                    >
                        {Industries.map((item) => (
                            <MenuItem key={item} value={item} sx={{ fontSize: 14, color: NAVY }}>
                                {item}
                            </MenuItem>
                        ))}
                    </TextField>
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Website</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        disabled={!editMode}
                        value={val("website")}
                        onChange={set("website")}
                        sx={inputFieldSx}
                    />
                </Grid>
            </Grid>

            {/* Address + Phone Number */}
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Address</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        disabled={!editMode}
                        value={val("address")}
                        onChange={set("address")}
                        sx={inputFieldSx}
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography sx={labelSx}>Phone Number</Typography>
                    <TextField
                        fullWidth
                        size="small"
                        disabled={!editMode}
                        value={val("phone")}
                        onChange={set("phone")}
                        sx={inputFieldSx}
                    />
                </Grid>
            </Grid>
        </Box >
    );
}