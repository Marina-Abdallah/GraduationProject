import React, { useState } from "react";
import {
  Box,
  Typography,
  Card,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Button,
  Divider,
} from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import { MainNavbar } from "../components/MainNavbar";
import { Footer } from "../components/Footer";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import backgroundImg from "../../assets/Background.png";

const NAVY = "#13206d";
const GREEN = "#84fba2";
const LIGHT_BLUE = "#90baef";

// ── Tax calculation (progressive US-style brackets for demo) ─────────────────
function calculateTax(gross, period, empType) {
  const annual = period === "month" ? gross * 12 : gross;

  let tax = 0;
  if (annual <= 10000) tax = annual * 0.1;
  else if (annual <= 40000) tax = 1000 + (annual - 10000) * 0.12;
  else if (annual <= 85000) tax = 4600 + (annual - 40000) * 0.22;
  else if (annual <= 160000) tax = 14500 + (annual - 85000) * 0.24;
  else if (annual <= 200000) tax = 32500 + (annual - 160000) * 0.32;
  else tax = 45300 + (annual - 200000) * 0.35;

  // Freelance/contract adds ~15.3% SE tax on top
  if (empType === "contract") tax += annual * 0.153 * 0.5;

  tax = Math.round(tax);
  const net = Math.round(annual - tax);
  const rate = annual > 0 ? ((tax / annual) * 100).toFixed(1) : "0.0";

  return { annual: Math.round(annual), tax, rate, net };
}

const fmt = (v) =>
  v != null
    ? Number(v).toLocaleString("en-US", { maximumFractionDigits: 0 }) + " EGP"
    : "-------";

// ── Custom donut chart label ──────────────────────────────────────────────────
const CHART_COLORS = [GREEN, LIGHT_BLUE];

// ── Styled select ─────────────────────────────────────────────────────────────
const selectSx = {
  borderRadius: "12px",
  background: "#f8fbff",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(144,186,239,0.4)",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: LIGHT_BLUE },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: NAVY },
};

// ── Result row ────────────────────────────────────────────────────────────────
function ResultRow({ label, value, highlight }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        py: 1.2,
      }}
    >
      <Typography
        sx={{
          color: NAVY,
          fontFamily: "Inter, sans-serif",
          fontSize: "15px",
          opacity: 0.85,
        }}
      >
        {label}
      </Typography>
      <Typography
        sx={{
          color: highlight ? GREEN : NAVY,
          fontFamily: "Inter, sans-serif",
          fontSize: "15px",
          fontWeight: highlight ? 700 : 400,
          opacity: value !== "-------" ? 1 : 0.35,
          letterSpacing: 0.3,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────
export function SalaryPage() {
  const navigate = useNavigate();
  const [grossIncome, setGrossIncome] = useState("");
  const [period, setPeriod] = useState("month");
  const [empType, setEmpType] = useState("fulltime");
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  const handleCalculate = () => {
    const val = parseFloat(grossIncome);
    if (!grossIncome || isNaN(val) || val <= 0) {
      setError("Please enter a valid gross income.");
      return;
    }
    setError("");
    setResults(calculateTax(val, period, empType));
  };

  const chartData = results
    ? [
      { name: "Tax", value: results.tax },
      { name: "Net Income", value: results.net },
    ]
    : [];

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
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* ── Navbar ──────────────────────────────────────────────── */}
      {/* <Box sx={{ width: "100%", pt: 4, px: { xs: 2, md: 4 }, position: "relative", zIndex: 20 }}>
        <MainNavbar />
      </Box> */}

      {/* ── Content ─────────────────────────────────────────────── */}
      <Box
        sx={{
          width: "100%",
          maxWidth: 1060,
          mx: "auto",
          px: { xs: 2, md: 4 },
          pt: { xs: 3, md: 5 },
          pb: { xs: 6, md: 10 },
          flex: 1,
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Back */}
        <Box sx={{ mb: 2 }}>
          <Button
            onClick={() => navigate("/Features")}
            startIcon={<ArrowBackIosNewIcon sx={{ fontSize: "13px !important" }} />}
            sx={{
              color: NAVY,
              background: "rgba(255,255,255,0.7)",
              borderRadius: "20px",
              textTransform: "none",
              fontWeight: 600,
              fontFamily: "Inter, sans-serif",
              px: 2.5,
              py: 1,
              border: `1px solid ${GREEN}`,
              backdropFilter: "blur(6px)",
              "&:hover": { background: "rgba(255,255,255,0.9)" },
            }}
          >
            Back to Features
          </Button>
        </Box>

        {/* Title */}
        <Typography
          sx={{
            color: NAVY,
            fontFamily: "Inter, sans-serif",
            fontWeight: 800,
            fontSize: { xs: "26px", md: "36px" },
            mb: 0.8,
          }}
        >
          Income Tax Calculator
        </Typography>
        <Typography
          sx={{
            color: NAVY,
            opacity: 0.65,
            fontFamily: "Inter, sans-serif",
            fontSize: "15px",
            mb: { xs: 3, md: 5 },
          }}
        >
          Calculate your income tax and understand your net salary after deductions.
        </Typography>

        {/* ── Two-column cards ───────────────────────────────────── */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            flexDirection: { xs: "column", md: "row" },
            alignItems: "stretch",
          }}
        >
          
          {/* ── Left: Input card ─────────────────────────────────── */}
          <Card
            sx={{
              flex: 1,
              borderRadius: "20px",
              p: { xs: 3, md: 4 },
              boxShadow: "0 4px 28px rgba(144,186,239,0.2)",
              border: "1px solid rgba(255,255,255,0.7)",
            }}
          >
            <Typography
              sx={{
                color: NAVY,
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                textAlign: "center",
                mb: 3.5,
              }}
            >
              Enter Your Details
            </Typography>

            {/* Gross Income */}
            <Typography
              sx={{
                color: LIGHT_BLUE,
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                mb: 0.8,
                letterSpacing: 0.3,
              }}
            >
              Gross Income
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter your gross income"
              value={grossIncome}
              onChange={(e) => {
                setGrossIncome(e.target.value);
                setError("");
              }}
              type="number"
              error={Boolean(error)}
              helperText={error}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: "12px",
                  background: "#f8fbff",
                  "& fieldset": { borderColor: "rgba(144,186,239,0.4)" },
                  "&:hover fieldset": { borderColor: LIGHT_BLUE },
                  "&.Mui-focused fieldset": { borderColor: NAVY },
                },
              }}
            />

            {/* In Time */}
            <Typography
              sx={{
                color: NAVY,
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                mb: 0.8,
              }}
            >
              In Time
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <Select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                sx={selectSx}
              >
                <MenuItem value="month">Per Month</MenuItem>
                <MenuItem value="year">Per Year</MenuItem>
              </Select>
            </FormControl>

            {/* Employment Type */}
            <Typography
              sx={{
                color: NAVY,
                fontFamily: "Inter, sans-serif",
                fontWeight: 600,
                fontSize: "13px",
                mb: 0.8,
              }}
            >
              Employment Type
            </Typography>
            <FormControl fullWidth sx={{ mb: 4 }}>
              <Select
                value={empType}
                onChange={(e) => setEmpType(e.target.value)}
                sx={selectSx}
              >
                <MenuItem value="fulltime">Full Time</MenuItem>
                <MenuItem value="parttime">Part Time</MenuItem>
                <MenuItem value="contract">Contract / Freelance</MenuItem>
              </Select>
            </FormControl>

            {/* Calculate button */}
            <Button
              fullWidth
              variant="contained"
              onClick={handleCalculate}
              sx={{
                background: GREEN,
                color: NAVY,
                fontFamily: "Inter, sans-serif",
                fontWeight: 800,
                fontSize: "17px",
                textTransform: "none",
                borderRadius: "12px",
                py: 1.6,
                boxShadow: "0 4px 18px rgba(132,251,162,0.5)",
                "&:hover": {
                  background: "#6ef094",
                  boxShadow: "0 6px 22px rgba(132,251,162,0.7)",
                },
              }}
            >
              Calculate
            </Button>
          </Card>

          {/* ── Right: Results card ──────────────────────────────── */}
          <Card
            sx={{
              flex: 1,
              borderRadius: "20px",
              p: { xs: 3, md: 4 },
              boxShadow: "0 4px 28px rgba(144,186,239,0.2)",
              border: "1px solid rgba(255,255,255,0.7)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              sx={{
                color: NAVY,
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                fontSize: "20px",
                textAlign: "center",
                mb: 3,
              }}
            >
              Tax Results
            </Typography>

            <ResultRow label="Gross Income:" value={results ? fmt(results.annual) : "-------"} />
            <Divider sx={{ borderColor: "rgba(19,32,109,0.07)" }} />
            <ResultRow label="Total Tax:" value={results ? fmt(results.tax) : "-------"} />
            <Divider sx={{ borderColor: "rgba(19,32,109,0.07)" }} />
            <ResultRow
              label="Total Rate:"
              value={results ? `${results.rate}%` : "------%"}
            />
            <Divider sx={{ borderColor: "rgba(19,32,109,0.07)" }} />
            <ResultRow
              label="Net Income:"
              value={results ? fmt(results.net) : "-------"}
              highlight={Boolean(results)}
            />

            {/* ── Donut chart ───────────────────────────────────── */}
            <Box sx={{ flex: 1, mt: 2, minHeight: 170 }}>
              {results ? (
                <ResponsiveContainer width="100%" height={170}>
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="38%"
                      cy="50%"
                      innerRadius={42}
                      outerRadius={65}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {chartData.map((_, idx) => (
                        <Cell key={idx} fill={CHART_COLORS[idx]} />
                      ))}
                    </Pie>
                    <Legend
                      layout="vertical"
                      align="right"
                      verticalAlign="middle"
                      formatter={(value) => (
                        <span
                          style={{
                            color: NAVY,
                            fontFamily: "Inter, sans-serif",
                            fontSize: 13,
                          }}
                        >
                          {value}
                        </span>
                      )}
                    />
                    <Tooltip
                      formatter={(v) => [
                        "EGP" + Number(v).toLocaleString(),
                        undefined,
                      ]}
                      contentStyle={{
                        borderRadius: 10,
                        border: "none",
                        boxShadow: "0 4px 16px rgba(19,32,109,0.12)",
                        fontFamily: "Inter, sans-serif",
                        color: NAVY,
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                /* Placeholder empty donut */
                <Box
                  sx={{
                    height: 170,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 110,
                      height: 110,
                      borderRadius: "50%",
                      border: `10px solid rgba(144,186,239,0.25)`,
                      borderTopColor: "rgba(132,251,162,0.25)",
                    }}
                  />
                </Box>
              )}
            </Box>
          </Card>
        </Box>
      </Box>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          zIndex: 10,
        }}
      >
        <Footer />
      </Box>
    </Box>
  );
}
