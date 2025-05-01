import React, { useState } from 'react';
import schools from './data/schools.json';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, TextField } from '@mui/material';
import dayjs from 'dayjs'; 
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

function AppContent() {
  const [birthDate, setBirthDate] = useState(null);
  const [results, setResults] = useState([]);
  const currentYear = new Date().getFullYear();
  const [targetYear, setTargetYear] = useState(currentYear + 1);

  const REFERENCE_YEAR = 2025; // 假设 birthdateRanges 是基于 2025 入学年

  const handleCheck = () => {
    if (!birthDate) return;

    const birth = birthDate.toDate();
    const filtered = [];

    for (const school of schools) {
      const matchedPrograms = [];

      if (school.birthdateRanges) {
        const shiftYears = targetYear - REFERENCE_YEAR;

        for (const range of school.birthdateRanges) {
          const from = new Date(range.from);
          const to = new Date(range.to);
          from.setFullYear(from.getFullYear() + shiftYears);
          to.setFullYear(to.getFullYear() + shiftYears);

          if (birth >= from && birth <= to) {
            matchedPrograms.push(range.grade);
          }
        }
      } else {
        const getCutoffForProgram = (school, program) => {
          const dateStr = (school.cutoffDates?.[program] || school.cutoffDate || "09-01");
          const [month, day] = dateStr.split("-").map(Number);
          return new Date(targetYear, month - 1, day);
        };
        
        
        for (const program of school.programs) {
          const requiredAge = school.ageRequirements?.[program];
          if (requiredAge == null) continue;
          
          const cutoff = getCutoffForProgram(school, program);
          const birthAnniversary = new Date(birth);
          birthAnniversary.setFullYear(birth.getFullYear() + requiredAge);

          const ageAtCutoff = (cutoff - birth) / (1000 * 60 * 60 * 24 * 365.25);
          const tooOld = ageAtCutoff - requiredAge > 1.2;

          if (birthAnniversary <= cutoff && !tooOld) {
            matchedPrograms.push(program);
          }
        }
      }

      if (matchedPrograms.length > 0) {
        filtered.push({
          school,
          matchedPrograms
        });
      }
    }

    setResults(filtered);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(to bottom right, #ffe4e6, #e0e7ff, #e0f2fe)",
      padding: "3rem 1.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start"
    }}>
      <Card
        isBlurred
        shadow="lg"
        style={{ maxWidth: "720px", width: "100%", padding: "2rem", borderRadius: "1.5rem" }}
      >
        <CardHeader style={{ flexDirection: "column", alignItems: "center", marginBottom: "1rem" }}>
          <h1 style={{ display: 'flex', flexDirection: "column", alignItems: "center", fontSize: "2rem", fontWeight: "bold", color: "#1e293b", marginBottom: "0.5rem" }}>
            Bay Area School Finder
          </h1>
          <p style={{ color: "#475569", fontSize: "0.95rem", textAlign: "center" }}>
            Help your family plan ahead with confidence.
          </p>
        </CardHeader>

        <CardBody style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "space-between",
                marginBottom: "1.5rem"
              }}
            >
              <FormControl style={{ minWidth: 150, flex: "1 1 200px" }}>
                <InputLabel id="target-year-label">Target Year</InputLabel>
                <Select
                  labelId="target-year-label"
                  id="target-year"
                  value={targetYear}
                  label="Target Year"
                  onChange={(e) => setTargetYear(parseInt(e.target.value))}
                >
                  <MenuItem value={currentYear}>{currentYear}</MenuItem>
                  <MenuItem value={currentYear + 1}>{currentYear + 1}</MenuItem>
                  <MenuItem value={currentYear + 2}>{currentYear + 2}</MenuItem>
                </Select>
              </FormControl>

              <DatePicker
                label="Child's Birthday"
                value={birthDate}
                onChange={(newValue) => setBirthDate(newValue)}
                renderInput={(params) => (
                  <TextField {...params} style={{ flex: "1 1 200px", minWidth: 150 }} />
                )}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleCheck}
                style={{ flex: "1 1 150px", minWidth: 120, height: 56 }}
              >
                Submit
              </Button>
            </div>
          </LocalizationProvider>

          {results.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "1.5rem",
                marginTop: "1rem"
              }}
            >
              {results.map(({ school, matchedPrograms }) => (
                <Card key={school.name} shadow="sm" style={{ backgroundColor: "#f8fafc", padding: "1rem" }}>
                  <CardHeader style={{ fontWeight: "bold", fontSize: "1rem", color: "#3730a3" }}>
                    {school.name}
                  </CardHeader>
                  <CardBody style={{ fontSize: "0.9rem", color: "#334155" }}>
                    <div><strong>Matched Programs for {targetYear}:</strong> {matchedPrograms.join(", ")}</div>
                  </CardBody>
                </Card>
              ))}
            </div>
          ) : (
            <p style={{
              textAlign: "center",
              marginTop: "1rem",
              fontSize: "0.9rem",
              color: "#64748b"
            }}>
              No schools matched this age. Please consult individual schools for more information.
            </p>
          )}
        </CardBody>
      </Card>
    </div>
  );
}

export default function App() {
  return (
    <AppContent />
  );
}
