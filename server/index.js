const express = require('express');
const cors = require('cors');
const app = express();
const schools = require('./schools.json');

app.use(cors());
app.use(express.json());

const REFERENCE_YEAR = 2025;

function getCutoffForProgram(school, program, entryYear) {
  const dateStr = school.cutoffDates?.[program] || school.cutoffDate || "09-01";
  const [month, day] = dateStr.split("-").map(Number);
  return new Date(entryYear, month - 1, day);
}

app.post('/api/match-schools', (req, res) => {
  const { birthDate, entryYear } = req.body;
  const birth = new Date(birthDate);
  const results = [];

  for (const school of schools) {
    const matchedPrograms = [];

    if (school.birthdateRanges) {
      const shiftYears = entryYear - REFERENCE_YEAR;
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
      for (const program of school.programs) {
        const requiredAge = school.ageRequirements?.[program];
        if (requiredAge == null) continue;

        const cutoff = getCutoffForProgram(school, program, entryYear);
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
      results.push({
        school,
        matchedPrograms: [...new Set(matchedPrograms)],
      });
    }
  }

  res.json(results);
});

const path = require('path');

// 托管 React build 静态文件
app.use(express.static(path.join(__dirname, '../client/build')));

// 对非 API 路由返回 React index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`School API server running on port ${PORT}`));
