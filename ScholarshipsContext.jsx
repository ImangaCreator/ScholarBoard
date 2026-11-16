import { createContext, useContext, useState } from 'react';
import { SAMPLE_SCHOLARSHIPS } from '../data/sampleScholarships.js';

// Holds the student's scholarships. Later chunks swap the sample data for Supabase.
const ScholarshipsContext = createContext(null);

export function ScholarshipsProvider({ children }) {
  const [scholarships, setScholarships] = useState(SAMPLE_SCHOLARSHIPS);

  const updateScholarship = (id, patch) =>
    setScholarships((list) => list.map((s) => (s.id === id ? { ...s, ...patch } : s)));

  return (
    <ScholarshipsContext.Provider value={{ scholarships, setScholarships, updateScholarship }}>
      {children}
    </ScholarshipsContext.Provider>
  );
}

export function useScholarships() {
  const ctx = useContext(ScholarshipsContext);
  if (!ctx) throw new Error('useScholarships must be used inside ScholarshipsProvider');
  return ctx;
}
