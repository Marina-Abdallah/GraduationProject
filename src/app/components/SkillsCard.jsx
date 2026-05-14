import React, { useState } from "react";
import { Box, Typography, Chip, Button, TextField, Collapse } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "./AppContext";

export function SkillsCard() {
  const { skills, addSkill, removeSkill } = useAppContext();
  const [showInput, setShowInput] = useState(false);
  const [newSkill, setNewSkill] = useState("");

  const handleAddMore = () => {
    setShowInput((prev) => !prev);
    setNewSkill("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      addSkill(newSkill.trim());
      setNewSkill("");
      setShowInput(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit(e);
    if (e.key === "Escape") {
      setShowInput(false);
      setNewSkill("");
    }
  };

  return (
    <Box
      sx={{
        bgcolor: "#fafafa",
        borderRadius: "16px",
        p: "20px",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0px 8px 8px 0px rgba(132,251,162,0.5)",
      }}
    >
      <Typography
        sx={{
          color: "#13206d",
          fontSize: "24px",
          fontWeight: 600,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        Skills &amp; Interests
      </Typography>

      {/* Skills Chips */}
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => removeSkill(skill)}
            sx={{
              bgcolor: "rgba(132,251,162,0.15)",
              border: "1.5px solid #84fba2",
              color: "#13206d",
              fontFamily: "'Inter', sans-serif",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "8px",
              "& .MuiChip-deleteIcon": {
                color: "#13206d",
                fontSize: "16px",
                "&:hover": { color: "#C32929" },
              },
            }}
          />
        ))}
      </Box>

      {/* Add Skill Input */}
      <Collapse in={showInput}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", gap: 1 }}
        >
          <TextField
            size="small"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. React"
            autoFocus
            sx={{
              flex: 1,
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                bgcolor: "rgba(255,255,255,0.6)",
                "& fieldset": { borderColor: "#84fba2" },
                "&:hover fieldset": { borderColor: "#13206d" },
                "&.Mui-focused fieldset": { borderColor: "#13206d" },
              },
              "& input": {
                color: "#13206d",
                fontFamily: "'Inter', sans-serif",
                fontSize: "14px",
              },
            }}
          />
          <Button
            type="submit"
            sx={{
              bgcolor: "#13206d",
              color: "#84fba2",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              "&:hover": { bgcolor: "#1a2d8a" },
            }}
          >
            Add
          </Button>
        </Box>
      </Collapse>

      {/* Add More Button */}
      <Button
        onClick={handleAddMore}
        startIcon={<AddIcon />}
        sx={{
          bgcolor: "#84fba2",
          color: "#13206d",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500,
          fontSize: "15px",
          borderRadius: "8px",
          py: 1,
          textTransform: "none",
          "&:hover": { bgcolor: "#6ef094" },
        }}
      >
        Add more
      </Button>
    </Box>
  );
}
