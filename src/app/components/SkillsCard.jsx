import React, { useState, useEffect } from "react";
import { Box, Typography, Chip, Button, TextField, Collapse, Autocomplete, CircularProgress } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAppContext } from "./AppContext";
import api from "../../api/axios";

export function SkillsCard() {
  const { skills, addSkill, removeSkill } = useAppContext();
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(null);

  useEffect(() => {
    let active = true;

    if (searchQuery === "") {
      setOptions([]);
      return undefined;
    }

    setLoading(true);

    const fetchSkills = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await api.get(`/Users/skills/search?query=${encodeURIComponent(searchQuery)}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (active) {
          let data = response.data;
          // Extract array if wrapped in an object
          if (data && typeof data === 'object' && !Array.isArray(data)) {
            data = data.data || data.items || data.skills || [];
          }

          const fetchedOptions = Array.isArray(data)
            ? data.filter(
              opt =>
                !skills.some(
                  s =>
                    (typeof s === "object" ? s.id : s) ===
                    (opt.id || opt.skillId)
                )
            )
            : [];

          setOptions(fetchedOptions);
        }
      } catch (error) {
        console.error("Error searching skills:", error);
      } finally {
        if (active) setLoading(false);
      }
    };

    const timer = setTimeout(() => {
      fetchSkills();
    }, 300);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [searchQuery, skills]);

  const handleAddMore = () => {
    setShowInput((prev) => !prev);
    setSearchQuery("");
    setSelectedSkill(null);
  };

  const handleAddSkill = async () => {
    if (selectedSkill) {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const skillIdToAdd = selectedSkill.id || selectedSkill.skillId;

        await api.post("/Users/skills", { skillId: skillIdToAdd }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        addSkill({ id: skillIdToAdd, name: selectedSkill.name || selectedSkill.skillName || selectedSkill.title || "Skill" });

        setSelectedSkill(null);
        setSearchQuery("");
        setShowInput(false);
      } catch (error) {
        console.error("Error adding skill:", error);
      }
    }
  };

  const handleDeleteSkill = async (skillObj) => {
    const skillId = typeof skillObj === 'object' ? (skillObj.id || skillObj.skillId || skillObj.name) : skillObj;
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await api.delete(`/Users/skills/${skillId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
    } finally {
      removeSkill(skillId);
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
        {skills.map((skill) => {
          const skillId = typeof skill === 'object' ? skill.id : skill;
          const skillName = typeof skill === 'object' ? (skill.name || skill.skillName || "Unknown") : skill;

          return (
            <Chip
              key={skillId}
              label={skillName}
              onDelete={() => handleDeleteSkill(skill)}
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
          );
        })}
      </Box>

      {/* Add Skill Input */}
      <Collapse in={showInput}>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Autocomplete
            //open={searchQuery.length > 0}
            noOptionsText="Type to search skills"
            sx={{ flex: 1 }}
            size="small"
            options={options}
            getOptionLabel={(option) => {
              if (typeof option === 'string') return option;
              return option.name || option.skillName || option.title || "Unknown";
            }}
            isOptionEqualToValue={(option, value) => {
              const optId = typeof option === 'string' ? option : (option.id || option.skillId);
              const valId = typeof value === 'string' ? value : (value.id || value.skillId);
              return optId === valId;
            }}
            //filterOptions={(x) => x} // Disable local filtering, let backend handle it
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={selectedSkill}
            onChange={(event, newValue) => {
              setSelectedSkill(newValue);
            }}
            onInputChange={(event, newInputValue) => {
              setSearchQuery(newInputValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Search skills..."
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>
                      {loading ? <CircularProgress color="inherit" size={20} /> : null}
                      {params.InputProps.endAdornment}
                    </React.Fragment>
                  ),
                }}
                sx={{
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
            )}
          />
          <Button
            onClick={handleAddSkill}
            disabled={!selectedSkill}
            sx={{
              bgcolor: "#13206d",
              color: "#84fba2",
              borderRadius: "8px",
              textTransform: "none",
              fontWeight: 600,
              px: 2,
              "&:hover": { bgcolor: "#1a2d8a" },
              "&.Mui-disabled": {
                bgcolor: "#ccc",
                color: "#888"
              }
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
