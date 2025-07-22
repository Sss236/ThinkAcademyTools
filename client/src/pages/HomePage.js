
import { useState } from "react";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, TextField } from '@mui/material';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

export const HomePage = () => {
  const [birthDate, setBirthDate] = useState(null);
  const [results, setResults] = useState([]);
  const [expandedSchool, setExpandedSchool] = useState(null);
  const currentYear = new Date().getFullYear();
  const [entryYear, setEntryYear] = useState(currentYear + 1);

  const handleCheck = async () => {
    if (!birthDate || !entryYear) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL || 'http://localhost:3001'}/api/match-schools`, {
        birthDate: birthDate.toDate(),
        entryYear: entryYear,
      });
      setResults(response.data);
    } catch (err) {
      console.error("Failed to fetch:", err);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      // background: "linear-gradient(to bottom right, #ffe4e6, #e0e7ff, #e0f2fe)",
      padding: "3rem 1.5rem",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start"
    }}>
      <Card
        isBlurred
        shadow="lg"
        style={{ maxWidth: "720px", width: "100%", padding: "2rem", borderRadius: "1.5rem"}}
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
                <InputLabel id="entry-year-label">Entry Year</InputLabel>
                <Select
                  labelId="entry-year-label"
                  id="entry-year"
                  value={entryYear}
                  label="Entry Year"
                  onChange={(e) => setEntryYear(parseInt(e.target.value))}
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
                <Card
                  key={school.name}
                  isPressable
                  shadow="sm"
                  onClick={() => setExpandedSchool(expandedSchool === school.name ? null : school.name)}
                  style={{
                    backgroundColor: "#f8fafc",
                    padding: "1rem",
                    cursor: "pointer",
                    transition: "all 0.2s ease-in-out",
                    boxShadow: expandedSchool === school.name ? "0 0 50px #c7d2fe" : undefined,
                    outline: "none",
                    border: "none"
                  }}
                >
                  <CardHeader style={{ fontWeight: "bold", fontSize: "1rem", color: "#3730a3" }}>
                    {school.name}
                  </CardHeader>
                  <CardBody style={{ fontSize: "0.9rem", color: "#334155" }}>
                    <div><strong>Matched Programs for {entryYear}:</strong> {matchedPrograms.join(", ")}</div>
                    {school.note && expandedSchool !== school.name && (
                          <div style={{ marginTop: "0.5rem", fontStyle: "italic", fontSize: "0.85rem", color: "#475569" }}>
                            Cut Off Date:{school.note}
                          </div>
                    )}
                    {expandedSchool === school.name && (
                      <div style={{ marginTop: "0.5rem"}}>
                        <div><strong>Address:</strong> {school.address || "N/A"}</div>
                        <div><a href={school.website} target="_blank" rel="noreferrer">Official Website</a></div>
                      </div>
                    )}
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